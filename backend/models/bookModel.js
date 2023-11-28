import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        
        title: {type: String, required: true},
        author: {type: String, required: true},
        publishYear: {type: Number, required: true},
        isbn: {type: String, required: true},
        price: {type: Number, required: true},
        category: {type: String, required: true},
        publisher: {type: String, required: true},        
        stock: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

export const Books = mongoose.model('books', bookSchema);