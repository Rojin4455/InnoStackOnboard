import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthFlow from '../pages/AuthFlow'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import UserProtectedRoute from './UserProtectedRoute'

function UserRouter() {
  return (
    <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/home' element={<UserProtectedRoute><Home/></UserProtectedRoute>} />
        <Route path='/auth-flow' element={<UserProtectedRoute><AuthFlow/></UserProtectedRoute>} />
        </Routes>
  )
}

export default UserRouter