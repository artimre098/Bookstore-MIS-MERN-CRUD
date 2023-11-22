import express, { response } from 'express';
import { PORT , mongoDBURL} from './config.js';
import mongoose from 'mongoose';

import booksRoute from './routes/booksRoute.js';
//import bodyParser from 'body-parser';   


const app = express();

app.use(express.json()); 

app.use('/books', booksRoute);

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send(`Welcome to MERN Stack`);
});



mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log(`DB connection established`);

        app.listen(PORT , ()=>{
            console.log(`listening on port: ${PORT}`);
        });

    })
    .catch((error)=>{
        console.log(error);
    });