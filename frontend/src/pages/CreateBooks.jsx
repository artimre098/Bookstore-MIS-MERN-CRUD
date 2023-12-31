import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios'

import CsvImportButton from '../components/CsvImportButton';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function CreateBooks() {
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

  const handleSaveBook = async () => {

    const existingBook = await axios.get('http://localhost:5555/books', {
      params: {
        title,
        author,
      },
    });


    if (existingBook.data.counts > 0) {
      enqueueSnackbar('Book with the same title and author already exists!', {
        variant: 'warning',
      });
      return;
    }

    const data = {
      title,
      author,
      publishYear,
      isbn,
      price,
      category,
      publisher,
      stock,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {

        setLoading(false);
        enqueueSnackbar('Book Created Successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Book Creation Error!', { variant: 'error' });
        setLoading(false);
      });
  };

  const handleImportCSV = async (importedData) => {
    try {
      // Assuming your API endpoint supports bulk inserts
      setLoading(true);

      // Map the imported data to the format expected by your API
      const formattedData = importedData.map((item) => ({
        title: item.title,
        author: item.author,
        publishYear: item.publishYear,
        isbn: item.isbn,
        price: item.price,
        category: item.category,
        publisher: item.publisher,
        stock: item.stock,
      }));

      const existingBooksResponse = await axios.get('http://localhost:5555/books');
      const existingBooks = existingBooksResponse.data.data;

      // Filter out existing books from the imported data
      const newBooks = formattedData.filter((importedBook) => {
        return !existingBooks.some((existingBook) => {
          return (
            existingBook.title === importedBook.title &&
            existingBook.author === importedBook.author
          );
        });
      });
      
      if (newBooks.length === 0) {
        enqueueSnackbar('No new books to insert.', { variant: 'info' });
        return;
      }

      // Send a POST request to your API endpoint
      await axios.post('http://localhost:5555/books/bulk-insert', newBooks);

      enqueueSnackbar('Books Imported Successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error importing books:', error.message);
      enqueueSnackbar('Error importing books', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? (
        <Spinner />
      ) : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>ISBN</label>
          <input
            type='text'
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder='Enter ISBN code'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter Book Title'
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
        <button className='p-2 bg-sky-300 m-1' onClick={handleSaveBook}>
          Save
        </button>
        <p className='text-center'> or..</p>
        <CsvImportButton onImport={handleImportCSV} />
      </div>
    </div>
  )
}

export default CreateBooks