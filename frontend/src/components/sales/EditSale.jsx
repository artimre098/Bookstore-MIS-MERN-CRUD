import React , {useState ,useEffect} from 'react'
import BackButton from '../BackButton.jsx';
import Spinner from '../Spinner.jsx';
import axios from 'axios'
import { useNavigate , useParams} from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditSale = () => {
 const {id} = useParams();
 const [customerName, setCustomerName] = useState('');
 const [department, setDepartment] = useState('');
 const [quantity, setQuantity] = useState('');
 const [price, setPrice] = useState('');
 const [book, setBook] = useState({});
 const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const fetchBookData = async (x) => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${x}`)
      .then((response) => {
        setBook(response.data.data);
        //console.log('fetchBookData HERE');
        //console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }

 useEffect (()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/bookSale/${id}`)
    .then((response) => {
      setCustomerName(response.data.data.customerName);
      setDepartment(response.data.data.department);
      setQuantity(response.data.data.quantity);
      setPrice(response.data.data.price);
      fetchBookData(response.data.data.book_id);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
},[]);

const handleEditSale = () => {
    const data = {
        customerName,
        department,
        quantity,
        price,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/bookSale/${id}` , data)
      .then(() => {
          
          setLoading(false);
          enqueueSnackbar('Book  Sales Updated Successfully!',{variant: 'success'});
          navigate(`/bookSale/details/${book._id}`);
      })
      .catch((error) => {
          console.log(error);
          enqueueSnackbar('Book Sales Update Error!',{variant: 'error'});
          setLoading(false);
      });
};
  return (
    <div className='p-4'>
      <BackButton destination={`/bookSale/details/${book._id}`} />
      <h1 className='text-3xl my-4'>Edit Sale</h1>
      {loading? (
        <Spinner />
      ):''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Customer name</label>
              <input
                type='text'
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
          </div>
          <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Department</label>
              <input
                type='text'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
          </div>
          <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Quantity</label>
              <input
                type='text'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
          </div>
          <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Price</label>
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditSale}>
              Save
          </button>
        </div>
    </div>
  )
}

export default EditSale