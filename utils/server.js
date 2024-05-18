import express, { Router } from 'express'
import userRouter from '../routes/user.routes.js'
import connectDB from './dbConnect.js';
const app = express();

app.use('/user',userRouter)

app.listen(3000,async()=>{
    console.log('Server Listening on Port 3000')
    try {
        await connectDB();
        console.log('MongoDb 🌿 Connected Successfully');
    } catch (error) {
        console.log('Failed to connect Database');
        process.exit(1);
    }
})

