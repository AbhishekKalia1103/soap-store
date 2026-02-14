import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  shippingCost: number;
  freeShippingThreshold: number;
}

const SettingsSchema = new Schema<ISettings>(
  {
    shippingCost: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    freeShippingThreshold: {
      type: Number,
      required: true,
      default: 699,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
