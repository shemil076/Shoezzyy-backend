import { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
  jobId: string;
  shoeId: Schema.Types.ObjectId;
  status: 'pending' | 'completed';
}

const orderSchema = new Schema<IOrder>({
  jobId: { type: String, required: true, unique: true },
  shoeId: { type: Schema.Types.ObjectId, ref: 'Shoe', required: true },
  status: { type: String, required: true, default: 'pending' }
});

export default model<IOrder>('Order', orderSchema);
