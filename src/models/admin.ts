import mongoose, { Schema, model, Document } from 'mongoose';

const adminSchema = new mongoose.Schema({
  email:{
    type: String,
    required : true,
    unique: true,
  },
  firstName :{
    type: String,
    required: true,
  },
  lastName :{
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required : true,
    default : 'admin',
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
