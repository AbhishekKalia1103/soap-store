import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Order from '@/lib/db/models/Order';
import Product from '@/lib/db/models/Product';

export async function GET() {
  try {
    await connectDB();

    // Get order statistics
    const [
      totalOrders,
      pendingOrders,
      paidOrders,
      totalRevenueResult,
      recentOrders,
      lowStockProducts,
      totalProducts,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ paymentStatus: 'paid' }),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Product.find({ inStock: false }).lean(),
      Product.countDocuments(),
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;

    return NextResponse.json({
      stats: {
        totalOrders,
        pendingOrders,
        paidOrders,
        totalRevenue,
        totalProducts,
        outOfStockProducts: lowStockProducts.length,
      },
      recentOrders,
      lowStockProducts,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
