import { Schema, model, Document } from 'mongoose';

interface IShoe extends Document {
  name: string;
  category: 'men' | 'women' | 'kids';
  // image: string;
}

const shoeSchema = new Schema<IShoe>({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['men', 'women', 'kids'] },
  // image: { type: String, required: true }
});

export default model<IShoe>('Shoe', shoeSchema);
