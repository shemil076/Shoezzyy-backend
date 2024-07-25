const mongoose = require("mongoose");
const Shoe = require('../models/Shoe').default;

const shoeModelData = [
    { _id: '668e3964c8525d360a48bdc4', model: 'AirJordan1' },
    { _id: '668e39b0c8525d360a48bdcd', model: 'AirJordan1' },
    { _id: '668e39e1c8525d360a48bdd6', model: 'AirJordan1' },
    { _id: '668e3a65c8525d360a48bddf', model: 'AirJordan1' },
    { _id: '668e3b36c8525d360a48bde8', model: 'AirJordan4' },
    { _id: '668e3baac8525d360a48bdf1', model: '530' },
    { _id: '668e3be2c8525d360a48bdf7', model: '530' },
    { _id: '668e3c3dc8525d360a48bdfd', model: '550' },
    { _id: '668e3cabc8525d360a48be06', model: '550' },
    { _id: '668e3d0dc8525d360a48be0c', model: '1906D' },
    { _id: '668e3d70c8525d360a48be18', model: '327' },
    { _id: '668e3de7c8525d360a48be23', model: '9060' },
    { _id: '668e3e54c8525d360a48be2e', model: 'Samba' },
    { _id: '668e3e97c8525d360a48be37', model: 'StanSmith' },
    { _id: '668e3ec4c8525d360a48be40', model: 'SuperStar' },
    { _id: '668e3eeec8525d360a48be49', model: 'YeezySlides' },
    { _id: '668e427cc8525d360a48be5e', model: null },
    { _id: '668e42dec8525d360a48be67', model: null },
    { _id: '668e4313c8525d360a48be70', model: null },

];

const addShoeModels = async () => {
    try{
        const mongoSecret = 'mongodb://localhost:27017/shoezzyy';
        if(!mongoSecret){
            throw new Error('Mongo Secret is not defied');
        }
        await mongoose.connect(mongoSecret,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })

        try {
            const updates = shoeModelData.map(async({_id, model})=>{
                return Shoe.updateOne(
                    {_id},
                    {$set : {model}}
                );
            });
            await Promise.all(updates);
            console.log("All shoes updated successfully");
        }catch(error){
            throw new Error('Failed to add the models')
        }

    }catch(error){
        throw new Error('Failed to connect to the mongodb');
    } 
};

addShoeModels();

