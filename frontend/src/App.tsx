import { Route, Routes } from 'react-router-dom'
import './App.css'
import React from 'react'
import Login from './components/pages/Signin'
import Signup from './components/pages/Signup'
import CommonDashboard from './components/pages/CommonDashboard'
import UserDashboard from './components/pages/UserDashboard'
import AdminDashboard from './components/pages/AdminDashboard'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/signin' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<CommonDashboard/>}></Route>
        <Route path='/user-dashboard' element={<UserDashboard/>}></Route>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App

