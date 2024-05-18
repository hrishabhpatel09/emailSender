import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: './.env'})

console.log(process.env.MONGODB_URI)
export default async function connectDB(){
    try {
        const response = await mongoose.connect(process.env.MONGODB_URI||"");
        if(response){
            console.log('MongoDB Connected Successfully');
        }else{
            console.log('Failed to connect')
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



