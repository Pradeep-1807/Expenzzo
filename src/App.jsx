import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../src/components/header/Header'
import NavigationBar from './components/navigationBar/NavigationBar'
import './App.css'

function App() {

  return (
    <main className='font-josefin gradient-background'>
      <Header />
      <Outlet />
      <NavigationBar />
    </main>
  )
}

export default App
