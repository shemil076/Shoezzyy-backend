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
    isATopPick: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    model:{
        type: String,
        default : null
    },
    sizeUrl:{
        type: String,
        required : true
    },
    minimumSize:{
        type: Number,
    },
    maximumSize:{
        type: Number,
       
    },
    availableSize :{
        type: Number,
    },
    isInstantDelivery:{
        type: Boolean,
        required: true,
        default: false
    }
});

const Shoe = mongoose.model('Shoe', shoeSchema);

export default Shoe;