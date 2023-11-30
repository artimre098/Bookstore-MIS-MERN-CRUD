import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';

import axios from 'axios';
const BookSaleModal = ({ book, onClose }) => {
  const [bookId, setBookId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [department, setDepartment] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('');
  const [publisher, setPublisher] = useState('');
  const [stock, setStock] = useState('');

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [proceeded, setProceeded] = useState(false);

  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  

  const handleCancel = () => {
    
    setShowConfirmation(false);
  };
  useEffect(() => {

    setBookId(book._id);
    setPrice(book.price);
    setTitle(book.title);
    setAuthor(book.author);
    setPublishYear(book.publishYear);
    setIsbn(book.isbn);
    setCategory(book.category);
    setPublisher(book.publisher);
    setStock(book.stock);
  }, [book]);

  const editBookInventory = async () => {
    const updatedStock = stock - quantity;
    const data = {
      title,
      author,
      publishYear,
      isbn,
      price,
      category,
      publisher,
      stock: updatedStock,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${bookId}`, data)
      .then(() => {

        setLoading(false);
        //enqueueSnackbar('Book Updated Successfully!',{variant: 'success'});
        console.log('Book Updated Successfully');
        setShowConfirmation(false);
        //navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Book Update Error!', { variant: 'error' });
        setLoading(false);
      });
  };
  const handleProceed = () => {
    setProceeded(true);
    handleBuyBook();
    //window.location.reload();
  };
  
  const thankYouMessage = (
    <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className=" bg-white p-4 rounded-md items-center ">
        <p className="text-gray-800">Thank you for the purchased!</p>
        <button
          onClick={() => {
            setShowConfirmation(false);
            setProceeded(false);
            onClose();
            window.location.reload();
          }}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
  
  // JSX for the confirmation modal
  const confirmationModal = (
    <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md">
        <p className="text-gray-800">Are you sure you want to proceed?</p>
        <div className="flex center mt-4 mx-7">
          <button
            onClick={handleProceed}
            className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
          >
            Proceed
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const handleBuyBook = async () => {

    const data = {
      bookId,
      customerName,
      department,
      quantity,
      price,

    };
    setLoading(true);
    console.log(data)
    axios
      .post('http://localhost:5555/bookSale', data)
      .then(() => {

        setLoading(false);
       
        editBookInventory();
        enqueueSnackbar('Book Sale Created Successfully!', { variant: 'success' });
        console.log('Book Sale Created Successfully!');
        
        
        
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Book Sale Creation Error!', { variant: 'error' });
        setLoading(false);
      });

  };
  return (
    <div className="fixed  bg-black bg-opacity-20 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Book Title: <span className="text-2xl font-bold text-blue-800">{book.title}</span></label>

        </div>
        <div className='flex items-center my-1'>
          <label className='text-sm mr-4 text-gray-500'>Price: <span className="text-2xl font-bold text-green-800">₱{book.price}</span></label>


          <label className='text-sm ml-4 mr-2 text-gray-500'>Available Stock: <span className="text-2xl font-bold text-blue-800">{book.stock}</span></label>

        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Customer Name</label>
          <input
            type='text'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder='Enter Customer Name'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Department</label>
          <input
            type='text'
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder='Enter Department'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder='Enter Quantity'
            className='border-2 border-gray-500 px-4 py-2 w-full text-xl text-blue-800 font-bold'
          />
        </div>
        <button className='p-2 bg-sky-300 my-5' onClick={handleSaveClick}>
          Save
        </button>
        {showConfirmation && !proceeded && confirmationModal}
        {proceeded && thankYouMessage}
        
      </div>

    </div>

  )
}

export default BookSaleModal