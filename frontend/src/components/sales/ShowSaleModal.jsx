import React from 'react'
import { FaUser, FaBuilding, FaMoneyBillAlt, FaShoppingBag, FaCalendarAlt, FaClock } from 'react-icons/fa';

const ShowSaleModal = ({ sales, onClose }) => {
    //console.log(sales._id);
    return (
        <div className="fixed bg-black bg-opacity-20 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center" onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()} className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col items-center justify-center relative">
                <div className='my-4'>
                    <label className='text-xl  mr-4 mr-2 text-black-500'>
                        <FaUser className="inline text-green-800" /> Customer name: <span className="text-2xl font-bold text-blue-800">{sales.customerName}</span>
                    </label>
                </div>
                <div className='my-4'>
                    <label className='text-xl   mr-4 mr-2 text-black-500'>
                        <FaBuilding className="inline text-green-800 text-xl" /> Department: <span className="text-xl font-bold text-blue-800">{sales.department}</span>
                    </label>
                </div>
                <div className='my-4'>
                    <label className='text-xl   mr-4 mr-2 text-black-500'>
                        <FaMoneyBillAlt className="inline text-green-800 text-xl" /> Price: <span className="text-xl font-bold text-blue-800">₱ {sales.price}</span>
                    </label>
                </div>
                <div className='my-4'>
                    <label className='text-xl   mr-4 mr-2 text-black-500'>
                        <FaShoppingBag className="inline text-green-800 text-xl" /> Quantity sold: <span className="text-xl font-bold text-blue-800">{sales.quantity}</span>
                    </label>
                </div>
                <div className='my-4'>
                    <label className='text-xl   mr-4 mr-2 text-black-500'>
                        <FaCalendarAlt className="inline text-green-800 text-xl" /> Date: <span className="text-xl font-bold text-blue-800">{new Date(sales.createdAt).toLocaleDateString()} - {new Date(sales.createdAt).toLocaleTimeString('en-US', { hour12: true })}</span>
                    </label>
                </div>
                
                <div className='my-4'>
                    <label className='text-xl   mr-4 mr-2 text-black-500'>
                        <FaCalendarAlt className="inline text-green-800 text-xl" /> Updated: <span className="text-xl font-bold text-blue-800">{new Date(sales.updatedAt).toLocaleDateString()} - {new Date(sales.updatedAt).toLocaleTimeString('en-US', { hour12: true })}</span>
                    </label>
                </div>
            </div>
        </div>

    )
}

export default ShowSaleModal