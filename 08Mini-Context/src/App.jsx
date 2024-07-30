import { useState } from 'react'
import Login from './componenets/Login'
import Profile from './componenets/Profile'
import './App.css'
import UserContextProvider from './context/UserContextProvider'

function App() {

  return (
    <UserContextProvider>
       <Login />
       <Profile />
    </UserContextProvider>
  )
}

export default App
