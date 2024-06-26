import { Schema, model, Document } from 'mongoose';
import { Brand } from '../types/enum';

interface IShoe extends Document {
  name: string;
  brand: Brand;
}

const shoeSchema = new Schema<IShoe>({
  name: { type: String, required: true },
  brand: { type: String, enum: Object.values(Brand), required: true }
});

const ShoeModel = model<IShoe>('Shoe', shoeSchema);

export default ShoeModel;
