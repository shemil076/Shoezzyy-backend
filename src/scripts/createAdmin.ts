const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require('../models/Admin').default;
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
    console.log("came here");
    const email = 'exampleAdmi@mail.com';
    const password = 'exampleAdminPassword';

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