import express from 'express';

import { Books } from '../models/bookModel.js';

const router = express.Router();

router.get('/',async(request,response)=>{
    try {
        const { title, author } = request.query;
        let query = {};
    
        if (title) {
          query.title = { $regex: new RegExp(title, 'i') };
        }
    
        if (author) {
          query.author = { $regex: new RegExp(author, 'i') };
        }
    
        const books = await Books.find(query);
    
        return response.status(200).json({
          counts: books.length,
          data: books,
        });
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
});

router.get('/:id',async(request,response)=>{
    try {

        const {id} = request.params;
        const book = await Books.findById(id);
        
        return response.status(200).json({
            counts: book ?1:0,
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
            !request.body.publishYear ||
            !request.body.isbn ||
            !request.body.price ||
            !request.body.category ||
            !request.body.publisher ||
            !request.body.stock
        ){
            return response.status(400).send({message:'Send all required fields: title, author, publishYear, synopsis'});
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
            !request.body.publishYear ||
            !request.body.isbn ||
            !request.body.price ||
            !request.body.category ||
            !request.body.publisher ||
            !request.body.stock
        ){
            return response.status(400).send({message:'Send all required fields: title, author, publishYear'});
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            isbn  : request.body.isbn,
            price: request.body.price,
            category: request.body.category,
            publisher: request.body.publisher,
            stock: request.body.stock,
        };

        const book = await Books.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error);
        console.status(500).send({message: error.message});
    }
});

router.post('/bulk-insert', async (req, res) => {
    try {
        const booksToInsert = req.body;
        
        if (!Array.isArray(booksToInsert)) {
          return res.status(400).json({ success: false, message: 'Invalid data format. Expected an array.' });
        }
    
        const result = await Books.insertMany(booksToInsert);
    
        res.status(201).json({ success: true, message: 'Books inserted successfully', result });
      } catch (error) {
        console.error('Error inserting books:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
      }
  });

export default router;