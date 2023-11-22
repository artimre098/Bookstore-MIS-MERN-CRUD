import express from 'express';

import { Books } from '../models/bookModel.js';

const router = express.Router();

router.get('/',async(request,response)=>{
    try {
        const books = await Books.find({});
        
        return response.status(200).json({
            counts: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.get('/:id',async(request,response)=>{
    try {

        const {id} = request.params;
        const book = await Books.findById(id);
        
        return response.status(200).json({
            counts: book.length,
            data: book,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.put('/:id',async(request,response)=>{
    try {
        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({message:'Send all required fields: title, author, publishYear'});
        }
        const {id} = request.params;

        const result = await Books.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message:'Book Not Found'});
        }
        
        return response.status(200).send({message:'Book Successfully Updated'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.delete('/:id',async(request,response)=>{
    try {
        
        const {id} = request.params;

        const result = await Books.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Book Not Found'});
        }
        
        return response.status(200).send({message:'Book Successfully Deleted'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.post('/',async (request,response)=>{
    try {
        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({message:'Send all required fields: title, author, publishYear'});
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Books.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error);
        console.status(500).send({message: error.message});
    }
});

export default router;