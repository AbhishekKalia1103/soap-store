import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '@/lib/db/mongodb';
import Order from '@/lib/db/models/Order';
import Product from '@/lib/db/models/Product';
import { getAuthUser } from '@/lib/auth';
import { calculateShipping } from '@/lib/shipping';

const TAX_RATE = 0.18;

export async function POST(request: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    await connectDB();

    // Get authenticated user (required for checkout)
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { customerEmail, customerName, items, shippingAddress } = body;

    // Validate required fields
    if (!customerEmail || !customerName || !items || !shippingAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must have at least one item' },
        { status: 400 }
      );
    }

    // Validate and build order items
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
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

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerEmail,
        customerName,
      },
    });

    // Create order in database with pending status
    const order = new Order({
      userId: user._id,
      customerEmail,
      customerName,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingCost,
      tax,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      razorpayOrderId: razorpayOrder.id,
    });

    await order.save();

    return NextResponse.json({
      orderId: order._id,
      orderNumber: order.orderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: total,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
