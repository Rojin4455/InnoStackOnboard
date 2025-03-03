import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import OnboardedPage from '../pages/OnboardedPage'

function UserRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/locations' element={<OnboardedPage/>} />
        </Routes>
  )
}

export default UserRouter