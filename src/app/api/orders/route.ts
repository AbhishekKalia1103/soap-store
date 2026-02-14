import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Order from '@/lib/db/models/Order';
import Product from '@/lib/db/models/Product';
import { calculateShipping } from '@/lib/shipping';

const TAX_RATE = 0.18; // 18% GST

// GET /api/orders - List orders with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sort = searchParams.get('sort') || '-createdAt';

    // Build query
    const query: Record<string, unknown> = {};

    if (email) {
      query.customerEmail = email.toLowerCase();
    }

    if (status) {
      query.status = status;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(query).sort(sort).skip(skip).limit(limit),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['customerEmail', 'customerName', 'items', 'shippingAddress'];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate items array
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must have at least one item' },
        { status: 400 }
      );
    }

    // Validate shipping address
    const addressFields = ['fullName', 'addressLine1', 'city', 'state', 'postalCode', 'country', 'phone'];
    const missingAddressFields = addressFields.filter((field) => !body.shippingAddress[field]);

    if (missingAddressFields.length > 0) {
      return NextResponse.json(
        { error: `Missing shipping address fields: ${missingAddressFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Fetch products and validate stock
    const orderItems = [];
    let subtotal = 0;

    for (const item of body.items) {
      if (!item.slug || !item.quantity || item.quantity < 1) {
        return NextResponse.json(
          { error: 'Each item must have a slug and quantity >= 1' },
          { status: 400 }
        );
      }

      const product = await Product.findOne({ slug: item.slug });

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.slug}` },
          { status: 404 }
        );
      }

      if (!product.inStock) {
        return NextResponse.json(
          { error: `Product is out of stock: ${product.name}` },
          { status: 400 }
        );
      }

      // Create order item snapshot
      orderItems.push({
        productId: product._id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });

      subtotal += product.price * item.quantity;
    }

    // Calculate totals
    const shippingCost = await calculateShipping(subtotal);
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shippingCost + tax;

    // Create order
    const order = new Order({
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      items: orderItems,
      shippingAddress: body.shippingAddress,
      subtotal,
      shippingCost,
      tax,
      total,
      status: 'pending',
      paymentStatus: 'pending',
    });

    await order.save();

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
