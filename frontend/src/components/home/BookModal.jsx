import { AiOutlineClose } from "react-icons/ai"
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"
import { FaMoneyBill, FaBox } from 'react-icons/fa'
import { useState , useEffect} from "react"
import BookSaleModal from "../sales/BookSaleModal"

const BookModal = ({ book, onClose }) => {
    const [showModal, setShowModal] = useState(true);
    
    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div onClick={(event) => event.stopPropagation()}
                className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
            >
                <AiOutlineClose className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
                    onClick={onClose}
                />

                <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
                    {book.category}
                </h2>
                <h4 className="my-2 text-gray-500">ISBN: {book.isbn}</h4>
                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">Book: <span className="font-bold text-blue-800">{book.title}</span></h2>
                </div>
                {/* <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">Author: <span className="font-bold italic">{book.author}</span></h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <FaMoneyBill className="text-red-300 text-2xl" />
                    <h2 className="my-1">Price: <span className="text-2xl font-bold text-green-800">₱{book.price}</span></h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <FaBox className="text-red-300 text-2xl" />
                    <h2 className="my-1">Available Stock: <span className="text-2xl font-bold text-blue-800">{book.stock}</span></h2>
                </div> */}
                {/* Buy Button */}
                <button
                    className="mt-10 bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        setShowModal(true);
                        onClose();
                        
                        
                        console.log("showModal:", showModal);
                    }}
                >
                    Buy
                </button>
            </div>
            {
                showModal && (
                    <BookSaleModal book={book} onClose={() => setShowModal(false)} />
                ) 
            }
        </div>
    )
}

export default BookModal