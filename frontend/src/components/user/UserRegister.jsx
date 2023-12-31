import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom';
import axios from 'axios'
const UserRegister = () => {
const [username,setUsername] = useState('');
const [password,setPassword] = useState('');
const [fullName,setFullName] = useState('');
const [confirmPassword,setConfirmPassword] = useState('');
const [email,setEmail] = useState('');
const [userType,setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
 
  

  const handleRegisterUser =  () => {
    
    const data = {
      username,
      fullName,
      email,
      password,
      confirmPassword,
      userType,
    };
    
    


    
  };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-gray-600 text-sm font-medium mb-2">
                            Fullname
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                            Password
                            
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-medium mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="UserType" className="block text-gray-600 text-sm font-medium mb-2">
                            UserType
                        </label>
                        <select
                            id="UserType"
                            name="UserType"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={userType}
            onChange={(e) => setUserType(e.target.value)}
                        >   
                            {/* Add your different user types as options */}
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={handleRegisterUser}
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4">
                    Already have an account?
                    <Link to="/" className="text-blue-500 hover:underline ml-1">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default UserRegister