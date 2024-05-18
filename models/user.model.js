import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is Required Field']
    },
    email: {
        type: String,
        required: [true,'Email is Required Field'],
        unique: [true,'Duplicate email']
    }
},{timestamps: true})


const User = mongoose.model('User',userSchema)

export default User;