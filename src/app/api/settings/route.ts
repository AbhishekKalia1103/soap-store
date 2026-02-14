import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Settings from '@/lib/db/models/Settings';

// GET /api/settings - Returns settings (creates defaults if none exist)
export async function GET() {
  try {
    await connectDB();

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        shippingCost: 0,
        freeShippingThreshold: 699,
      });
    }

    return NextResponse.json({
      shippingCost: settings.shippingCost,
      freeShippingThreshold: settings.freeShippingThreshold,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PATCH /api/settings - Update settings
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { shippingCost, freeShippingThreshold } = body;

    // Validate
    if (shippingCost !== undefined && (typeof shippingCost !== 'number' || shippingCost < 0)) {
      return NextResponse.json(
        { error: 'shippingCost must be a non-negative number' },
        { status: 400 }
      );
    }

    if (freeShippingThreshold !== undefined && (typeof freeShippingThreshold !== 'number' || freeShippingThreshold < 0)) {
      return NextResponse.json(
        { error: 'freeShippingThreshold must be a non-negative number' },
        { status: 400 }
      );
    }

    const update: Record<string, number> = {};
    if (shippingCost !== undefined) update.shippingCost = shippingCost;
    if (freeShippingThreshold !== undefined) update.freeShippingThreshold = freeShippingThreshold;

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: update },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      shippingCost: settings.shippingCost,
      freeShippingThreshold: settings.freeShippingThreshold,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
