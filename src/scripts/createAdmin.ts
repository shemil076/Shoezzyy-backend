const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require('../models/Admin').default;
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
    const firstName = "Afzal";
    const lastName = "Jazeel";
    const email = 'shoe.zzyyofficial@gmail.com';
    const password = 'Shz@!.Webcom5t';

    try {
        const mongoSecret = 'mongodb://localhost:27017/shoezzyy';
        if (!mongoSecret) {
            throw new Error('MONGO is not defined');
        }
        await mongoose.connect(mongoSecret, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hasedPassword,
            role:'admin'
        });

        await newAdmin.save();
        console.log('Admin created syccessfully');


    } catch (error) { 
        console.error(error);
    }finally{
        mongoose.connection.close();
    }
};

createAdmin();