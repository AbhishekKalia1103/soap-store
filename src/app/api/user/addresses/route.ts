import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ addresses: user.addresses });
  } catch (error) {
    console.error('Fetch addresses error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch addresses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      label,
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault,
    } = body;

    // Validate required fields
    if (!label || !fullName || !addressLine1 || !city || !state || !postalCode || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If this is set as default, unset other default addresses
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    // If this is the first address, make it default
    const shouldBeDefault = isDefault || user.addresses.length === 0;

    user.addresses.push({
      label,
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country: country || 'India',
      phone,
      isDefault: shouldBeDefault,
    });

    await user.save();

    return NextResponse.json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error('Add address error:', error);
    return NextResponse.json(
      { error: 'Failed to add address' },
      { status: 500 }
    );
  }
}
