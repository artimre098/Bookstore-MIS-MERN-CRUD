import mongoose from "mongoose";

const bookSaleSchema = new mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    customerName: { type: String, required: true },
    department: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    datestamp: { type: Date, default: Date.now },
});


export const BookSale = mongoose.model('BookSale', bookSaleSchema);
