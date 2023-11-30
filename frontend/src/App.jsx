import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home.jsx';
import CreateBooks from '../src/pages/CreateBooks.jsx'
import ShowBooks from '../src/pages/ShowBooks.jsx'
import EditBook from '../src/pages/EditBook.jsx'
import DeleteBook from '../src/pages/DeleteBook.jsx'
import HomeSales from './pages/HomeSales.jsx';

<page></page>
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/books/create' element={<CreateBooks />}/>
      <Route path='/books/details/:id' element={<ShowBooks />}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={< DeleteBook/>}/>
      <Route path='/bookSales' element={<HomeSales />}/>
    </Routes>
  )
}

export default App