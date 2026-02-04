import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db/mongodb';
import Order, { OrderStatus, PaymentStatus } from '@/lib/db/models/Order';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/orders/[id] - Get order by orderNumber or _id
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;
    let order;

    // Check if id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findById(id);
    }

    // If not found by _id, try finding by orderNumber
    if (!order) {
      order = await Order.findOne({ orderNumber: id });
    }

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] - Update order status
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();

    // Validate status values if provided
    const validStatuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    const validPaymentStatuses: PaymentStatus[] = ['pending', 'paid', 'failed', 'refunded'];

    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    if (body.paymentStatus && !validPaymentStatuses.includes(body.paymentStatus)) {
      return NextResponse.json(
        { error: `Invalid payment status. Must be one of: ${validPaymentStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Only allow updating status and paymentStatus
    const allowedUpdates: Record<string, unknown> = {};
    if (body.status) allowedUpdates.status = body.status;
    if (body.paymentStatus) allowedUpdates.paymentStatus = body.paymentStatus;

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update. Only status and paymentStatus can be updated.' },
        { status: 400 }
      );
    }

    let order;

    // Check if id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findByIdAndUpdate(id, allowedUpdates, {
        new: true,
        runValidators: true,
      });
    }

    // If not found by _id, try finding by orderNumber
    if (!order) {
      order = await Order.findOneAndUpdate({ orderNumber: id }, allowedUpdates, {
        new: true,
        runValidators: true,
      });
    }

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
