import mongoose, { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
  jobId: string;
  shoeId: Schema.Types.ObjectId;
  status: 'pending' | 'completed';
}

const orderSchema1 = new Schema<IOrder>({
  jobId: { type: String, required: true, unique: true },
  shoeId: { type: Schema.Types.ObjectId, ref: 'Shoe', required: true },
  status: { type: String, required: true, default: 'pending' }
});

const orderSchema = new mongoose.Schema({
  jobId:{
    type: String,
    required : true
  },
  shoeId:{
    type: String,
    required: true
  },
  shoeBrand:{
    type: String,
    required : true
  },
  quantity:{
    type: Number,
    required: true
  },
  cost:{
    type: Number,
    required : true
  },
  status:{
    type: String,
    required: true
  },
});


const Order = mongoose.model('Order', orderSchema);

export default Order;
