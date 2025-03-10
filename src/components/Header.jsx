import React, { useState } from 'react';
import { X, LogOut, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { clearUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const email = useSelector((state) => state.user.email)
const REACT_APP_BASE_API_URL = process.env.REACT_APP_BASE_API_URL
const dispatch = useDispatch()
const navigate = useNavigate()
  
  const handleLogout = async () => {
    console.log("Logging out...");
    setShowLogoutModal(false);
    try{
        const response = await axios.get(`${REACT_APP_BASE_API_URL}/accounts/logout`, { withCredentials: true })
        if (response.status === 200){
            toast.success("Logging out Successfully...");
            dispatch(clearUser({}))
            navigate('/')
            
        }else{
            toast.error("something went wrong")
        }
    }catch{
        toast.error("something went wrong!")
    }

  };
  
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo or Brand Name */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">InnoStack</h1>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">

                    <User size={20} />
                </div>
                <span className="ml-2 text-gray-700 font-medium">{email}</span>
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Confirm Logout</h3>
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-2">
              <p className="text-gray-600">Are you sure you want to log out of your account?</p>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;