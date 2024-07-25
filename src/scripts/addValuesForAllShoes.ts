const mongoose = require("mongoose");
const Shoe = require('../models/Shoe').default;

const addValuesForAllShoes = async () =>{
    const sizeUrl = 'https://drive.google.com/file/d/19F4gj8pv0_a1xU6HFwLDhF_JjLz1Gik2/view?usp=sharing';
    try{
        const mongoSecret = 'mongodb://localhost:27017/shoezzyy';
        if(!mongoSecret){
            throw new Error('Mongo secrete is not defined')
        }

        await mongoose.connect(mongoSecret,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })

        try{
             await Shoe.updateMany(
                {},
                {$set : {sizeUrl}}
             );

             console.log("updaed")!
        }catch(error){
            throw new Error('Failed to add size urls')
        } finally {
            await mongoose.disconnect(); 
        }
    }catch(error){
        throw new Error('Failed to connect to the db');
    }
};

addValuesForAllShoes();