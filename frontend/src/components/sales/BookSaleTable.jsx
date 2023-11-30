import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const BookSaleTable = ({ books, sales }) => {
    const totalQuantities = {};

    
    sales.forEach((sale) => {
        if (!totalQuantities[sale.book_id]) {
            totalQuantities[sale.book_id] = 0;
        }
        totalQuantities[sale.book_id] += sale.quantity;
    });

    // Calculate total quantities for each book


    return (
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-mb'> No</th>
                    <th className='border border-slate-600 rounded-mb '> Title</th>
                    <th className='border border-slate-600 rounded-mb max-md:hidden'> Remaining Stock </th>
                    <th className='border border-slate-600 rounded-mb max-md:hidden'> Sales</th>
                    <th className='border border-slate-600 rounded-mb'> Operations</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book._id} className='h-8'>
                        <td className='border border-slate-700 rounded-mb text-center'>
                            {index + 1}
                        </td>
                        <td className='border border-slate-700 rounded-mb text-center'>
                            {book.title}
                        </td>
                        <td className='border border-slate-700 rounded-mb text-center font-bold text-blue-800 max-md:hidden'>
                            {book.stock}
                        </td>
                        <td className='border border-slate-700 rounded-mb text-center max-md:hidden'>
                            {totalQuantities[book._id] || 0}

                        </td>
                        <td className='border border-slate-700 rounded-mb text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <Link to={`/bookSale/details/${book._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800' />
                                </Link>
                                <Link to={`books/edit/${book._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                </Link>
                                <Link to={`books/delete/${book._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}

export default BookSaleTable