import connectDB from '@/lib/db/mongodb';
import Settings from '@/lib/db/models/Settings';

export async function calculateShipping(subtotal: number): Promise<number> {
  await connectDB();

  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      shippingCost: 0,
      freeShippingThreshold: 699,
    });
  }

  if (settings.freeShippingThreshold > 0 && subtotal >= settings.freeShippingThreshold) {
    return 0;
  }

  return settings.shippingCost;
}
