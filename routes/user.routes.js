import fs from 'fs'
import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import User from '../models/user.model.js'
import {readCsv} from '../utils/csv.js'


const router = Router()

router.get('/me',(req,res)=>{
    res.send('Hello')
})

router.post('/readCSV',upload.single('file'),async(req,res)=>{
    //reading file data and saving in dataBase
    let successCount = 0; // user that are registering now.
    let errorCount = 0;
    readCsv(req.file.path)
    .then(async(data)=>{
        data.map(async(user)=>{
            const name = user.name;
            const email = user.email;
            const newUser = new User({
                name: name,
                email: email
            })
            newUser.save()
            .then(()=>{
                successCount++;
            })
            .catch(err=>{
                fs.appendFile('./errors.csv',`${user.name},${err.errorResponse.errmsg}\n`,()=>{});
                errorCount++;
            });
        })

        //deleting the file after the job is done
        fs.unlink(req.file.path,(err)=>{
            console.log(err)
        })

        const AllUsers = await User.find({});

        res.json({
            success_count: successCount,
            failed_count: errorCount,
            total_count: AllUsers.length
        })

    }) 
})

export default router

