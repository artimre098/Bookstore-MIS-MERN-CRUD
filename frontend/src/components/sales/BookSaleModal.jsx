import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState } from "react"

const BookSaleModal = ({ book, onClose }) => {
    const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [publisher, setPublisher] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  return (
        <div className="fixed  bg-black bg-opacity-20 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div onClick={(event) => event.stopPropagation()}
                className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
            >
                <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Book Title</label>
          <input
            type='text'
            value={book.title}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder='Enter ISBN code'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={book.author}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter Book Author'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='Enter Author Name'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            placeholder='Enter Publish Year'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter Book Price'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Category</label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder='Enter Book Category Name'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Publisher</label>
          <input
            type='text'
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder='Enter Publisher Name'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Stock</label>
          <input
            type='number'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder='Enter Stock'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-1' onClick={console.log("save button clicked")}>
          Save
        </button>
            </div>

        </div>
  )
}

export default BookSaleModal