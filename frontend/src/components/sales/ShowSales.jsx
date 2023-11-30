
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../BackButton.jsx'
import Spinner from '../Spinner.jsx'
import ShowSaleModal from './ShowSaleModal.jsx'
import { BiShow } from 'react-icons/bi'

import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import Search from '../Search.jsx'


const ShowSales = () => {
  const [book, setBook] = useState({});
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [selectedSale, setSelectedSale] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [numberOfData, setNumberOfData] = useState();





  const handleSale = (clickedSale) => {

    setSelectedSale(clickedSale);

    // Open the modal
    setShowModal(true);
  };
  const fetchBookData = async () => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        //console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }
  const fetchSalesData = async () => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/bookSale`)
      .then((response) => {
        //   setSales(response.data.data);
        const filteredData = response.data.data.filter(item => item.book_id === id);
        setSales(filteredData);
        const x = response.data.data;
        setNumberOfData(x.length);
        //calculateTotalSales();
        //console.log(filteredData);
        calculateTotalSales(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }
  const calculateTotalSales = (sale) => {
    let total = 0;
    sale.forEach((sales) => {
      total += sales.quantity * sales.price;
    });
    const formattedTotalSales = new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(total);
    setTotalSales(formattedTotalSales);
  }

  useEffect(() => {
    fetchBookData();
    fetchSalesData();

  }, [])
  const handleSort = (column) => {
    // If clicking on the same column, reverse the sorting order
    const newSortOrder = column === sortColumn && sortOrder === 'asc' ? 'desc' : 'asc';

    // Update the state with the new sorting order and column
    setSortOrder(newSortOrder);
    setSortColumn(column);

    // Sort the sales array based on the selected column and order
    const sortedSales = [...sales].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (column === 'customerName' || column === 'department') {
        return newSortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (column === 'quantity') {
        // Assuming quantity is a numeric value
        return newSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });

    // Update the state with the sorted array
    setSales(sortedSales);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        //console.log('Search Term:', searchTerm);
        if (searchTerm.trim() === '') {
          // console.log('Fetching original data...');
          fetchBookData();
          fetchSalesData(); // If search term is empty, fetch original data
        } else {
          setLoading(true);
          const response = await axios.get(`http://localhost:5555/bookSale`);
          const filteredData = response.data.data.filter(item => item.book_id === id);
          const filteredBooks = response.data.data.filter((sale) => sale.book_id === id &&(
            sale.customerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
            sale.department.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
            sale.quantity.toString().indexOf(searchTerm) !== -1)

          );


          setSales(filteredBooks);
          calculateTotalSales(filteredBooks);
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
      <div className="flex justify-between items-center">

        <BackButton destination="/bookSale" />
        <Search onSearch={setSearchTerm} />
      </div>
      <h1 className='text-3xl my-4 text-center font-bold text-blue-800'>{book.title}</h1>
      <h1 className='text-2xl my-4 text-center '> Total Sales: <span className='font-bold'>{totalSales}</span></h1>
      {loading ? (
        <Spinner />
      ) : book.length === 0 ? (
        <p>No sales details found.</p>
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-mb'> No</th>
              <th className='border border-slate-600 rounded-mb hover:text-black cursor-pointer' onClick={() => { handleSort('customerName'), setSortColumn('customerName') }} > Customer </th>
              <th className='border border-slate-600 rounded-mb max-md:hidden hover:text-black cursor-pointer' onClick={() => { handleSort('department'), setSortColumn('department') }} > Department</th>
              <th className='border border-slate-600 rounded-mb max-md:hidden hover:text-black cursor-pointer' onClick={() => { handleSort('quantity'), setSortColumn('quantity') }}  > Quantity</th>
              {/* <th className='border border-slate-600 rounded-mb max-md:hidden'> Date</th> */}
              <th className='border border-slate-600 rounded-mb'> Operations</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={sale._id} className='h-8'>
                <td className='border border-slate-700 rounded-mb text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-mb text-center'>
                  {sale.customerName}
                </td>
                <td className='border border-slate-700 rounded-mb text-center font-bold text-blue-800 max-md:hidden'>
                  {sale.department}
                </td>
                <td className='border border-slate-700 rounded-mb text-center max-md:hidden'>
                  {sale.quantity}

                </td>
                {/* <td className='border border-slate-700 rounded-mb text-center max-md:hidden'>
                            {new Date(sale.createdAt).toLocaleDateString()}

                        </td> */}
                <td className='border border-slate-700 rounded-mb text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <BiShow
                      className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                      // onClick={() => setShowModal(true)}
                      onClick={() => {
                        handleSale(sale);
                      }}
                    />
                    <Link to={`/bookSale/details/${sale._id}`}>
                    <AiOutlineEdit className='text-3xl text-yellow-600 hover:text-black cursor-pointer' 
                        onClick={()=>{
                          console.log(sale._id)
                        }}
                    />
                    </Link>
                    {/* <Link to={`/bookSale/details/${sale._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800' />
                                </Link>
                                <Link to={`books/edit/${sale._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                </Link>
                                <Link to={`books/delete/${sale._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                </Link> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
      {
        showModal && (

          <ShowSaleModal sales={selectedSale} onClose={() => setShowModal(false)} />

        )
      }
    </div>
  )
}

export default ShowSales