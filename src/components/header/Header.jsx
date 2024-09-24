import React, { useState } from 'react'
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleMenubarClicked } from '../../store/accountSlice';
import '../../../src/App.css'

const Header = () => {

  const authStatus = useSelector((state)=>state.auth.status)
  const dispatch = useDispatch()
  const displayValue = authStatus ? 'block' : 'none';


  function handleMenuBarClick(){
    dispatch(toggleMenubarClicked())
  }
  
  return (
    <div className='h-[10vh] .gradient-background sm:h-[8vh] w-screen fixed top-0 right-0 left-0 flex justify-between items-center border border-gray-100 z-[500]' >
      <h1 className='font-oregano font-bold text-2xl sm:text-4xl text-white ml-2 sm:ml-5 '>Expenzo</h1>
      <div className='mr-[10px] block sm:hidden' onClick={handleMenuBarClick}>
        <MenuSharpIcon sx={{color:'white',fontSize:'30px',cursor:'pointer',display:`${displayValue}`}} />
      </div>
      
    </div>
  )
}

export default Header
