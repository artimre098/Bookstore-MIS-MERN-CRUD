import express, { response } from 'express';
import { PORT , mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';
import bookSaleRoute from './routes/bookSaleRoute.js';
//import bodyParser from 'body-parser';   


const app = express();

app.use(express.json()); 

//Cors Policy
app.use(cors());
// app.use(cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.use('/books', booksRoute);
app.use('/bookSale', bookSaleRoute);

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