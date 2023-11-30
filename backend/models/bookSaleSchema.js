import mongoose from "mongoose";

const bookSaleSchema = mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    customerName: { type: String, required: true },
    department: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
},{
    timestamps: true,
});


export const BookSale = mongoose.model('BookSale', bookSaleSchema);
