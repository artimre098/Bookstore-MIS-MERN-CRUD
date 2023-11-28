import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'

import Search from '../components/Search'



function Home() {

    const [numberOfData,setNumberOfData] = useState();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    const [searchTerm, setSearchTerm] = useState('');


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5555/books');
            setBooks(response.data.data);
            const x = response.data.data;
            setNumberOfData(x.length);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                console.log('Search Term:', searchTerm);
                if (searchTerm.trim() === '') {
                    console.log('Fetching original data...');
                    fetchData(); // If search term is empty, fetch original data
                } else {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:5555/books`);
                    const filteredBooks = response.data.data.filter((book) =>
                        book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
                        book.author.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
                        book.publishYear.toString().indexOf(searchTerm) !== -1
                        
                    );
                    
                    setBooks(filteredBooks);
                    setNumberOfData(filteredBooks.length);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        handleSearch();
    }, [searchTerm]);
    return (
        <div className='p-4'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-y-4 md:gap-x-4'>
                <Search onSearch={setSearchTerm} />
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('table')}
                >
                    Card
                </button>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('card')}
                >
                    Table
                </button>

            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-10'>Books List : {numberOfData}</h1>
                <Link to='books/create' className='flex items-center gap-2'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                    <span className='text-xl'>Add Book</span>
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (

                showType === 'table' ? (<BooksCard books={books} />) : (<BooksTable books={books} />)

            )}
        </div>
    )
}

export default Home