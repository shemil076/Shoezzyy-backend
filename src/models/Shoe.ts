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
    actualPrice: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    isATopPcik: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Shoe = mongoose.model('Shoe', shoeSchema);

export default Shoe;
