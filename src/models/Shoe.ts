// shoeModel.js
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const shoeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
});

const Shoe = mongoose.model('Shoe', shoeSchema);

export default Shoe;
