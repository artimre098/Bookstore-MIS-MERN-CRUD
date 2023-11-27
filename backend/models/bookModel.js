import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{type: String, required: true},
        author: {type: String, required: true},
        publishYear: {type: Number, required: true},
        synopsis: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

export const Books = mongoose.model('books', bookSchema);