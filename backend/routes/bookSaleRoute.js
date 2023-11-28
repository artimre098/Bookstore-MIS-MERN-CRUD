import express from 'express';
import { BookSale } from '../models/bookSaleModel.js';

const router = express.Router();

// Get all book sales
router.get('/', async (req, res) => {
    try {
        const bookSales = await BookSale.find();
        res.status(200).json({ success: true, data: bookSales });
    } catch (error) {
        console.error('Error fetching book sales:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Get a specific book sale by ID
router.get('/:id', async (req, res) => {
    try {
        const bookSale = await BookSale.findById(req.params.id);
        if (!bookSale) {
            return res.status(404).json({ success: false, message: 'Book Sale not found' });
        }
        res.status(200).json({ success: true, data: bookSale });
    } catch (error) {
        console.error('Error fetching book sale by ID:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Create a new book sale
router.post('/', async (req, res) => {
    try {
        const newBookSale = {
            book_id: req.body.book_id,
            customerName: req.body.customerName,
            department: req.body.department,
            quantity: req.body.quantity,
            price: req.body.price,
        };

        const bookSale = await BookSale.create(newBookSale);

        res.status(201).json({ success: true, data: bookSale });
    } catch (error) {
        console.error('Error creating book sale:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Update a book sale by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedFields = {
            customerName: req.body.customerName,
            department: req.body.department,
            quantity: req.body.quantity,
            price: req.body.price,
        };

        const bookSale = await BookSale.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        if (!bookSale) {
            return res.status(404).json({ success: false, message: 'Book Sale not found' });
        }

        res.status(200).json({ success: true, data: bookSale });
    } catch (error) {
        console.error('Error updating book sale by ID:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Delete a book sale by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await BookSale.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ success: false, message: 'Book Sale not found' });
        }

        res.status(200).json({ success: true, message: 'Book Sale deleted successfully' });
    } catch (error) {
        console.error('Error deleting book sale by ID:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;
