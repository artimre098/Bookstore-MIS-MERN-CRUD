import React , {useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateBooks() {
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
      const data = {
          title,
          author,
          publishYear,
      };
      setLoading(true);
      axios
        .get('http://localhost:5555/books' ,data)
        .then(() => {
            setLoading(false);
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
  };

  return (
    <div>CreateBooks</div>
  )
}

export default CreateBooks