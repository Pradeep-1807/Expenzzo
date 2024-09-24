import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import '../App.css'


import BackgroundImg from '../assets/images/BackgroundImg.jpg'


const Authentication = () => {

  const navigate = useNavigate(); 
  const dispatch = useDispatch()

  const authStatus = useSelector((state)=> state.auth.status)
  console.log('AuthStatus form Authentication ', authStatus)

  function handleNavigation(e){
    console.log(e.target.innerText);
    navigate(`/${e.target.innerText.toLowerCase()}`);
  }
  
  localStorage.clear()

  return (
    <div 
      className='min-h-screen w-screen flex flex-col justify-center items-center gap-10 bg-cover bg-center'>

      

      <div className='w-[80%] lg:w-[50%] flex flex-wrap'>
        <h1 className='text-white text-2xl sm:text-4xl font-roboto font-bold' id="typewriter-text">
          Budgeting made easy, simplify how you manage your money.
        </h1>
      </div>

      <div className='w-[80%] lg:w-[50%] flex justify-center flex-wrap gap-20'>

        <button 
          className='text-gray-800 py-1 px-3 sm:py-2 sm:px-4 text-base sm:text-xl bg-yellow-400 rounded-md hover:bg-transparent duration-300 hover:text-white hover:border-2 hover:border-yellow-400' 
          onClick={handleNavigation}>
            Signup
        </button>

        
        <button 
          className='text-gray-800 py-1 px-3 sm:py-2 sm:px-4 text-base sm:text-xl bg-yellow-400 rounded-md hover:bg-transparent duration-300 hover:text-white hover:border-2 hover:border-yellow-400'
          onClick={handleNavigation} >
            Login
        </button>

      </div>

      
      

    </div>
  )
}

export default Authentication
