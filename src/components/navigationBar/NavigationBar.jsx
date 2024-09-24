import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavIcons from './NavIcons';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ManageHistorySharpIcon from '@mui/icons-material/ManageHistorySharp';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PaidIcon from '@mui/icons-material/Paid';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';

import { useDispatch } from 'react-redux';
import { toggleMenubarClicked } from '../../store/accountSlice';
import '../../App.css'



const NavigationBar = () => {
    const authStatus = useSelector((state)=>state.auth.status)
    const menubarClicked = useSelector((state)=>state.account.menubarClicked)
    const opacity = menubarClicked ? 'opacity-100 z-50 ' : 'opacity-0 -z-50' 
    const dispatch = useDispatch()
    
    if (!authStatus) return 

    
    function handleCloseClick(){
      dispatch(toggleMenubarClicked())
    }
    
   

  return (
    <div className={`fixed top-[10vh] right-0 ${opacity} h-[60%] w-[50%] flex flex-col justify-start gap-2 transition-all duration-300 pt-5
                    sm:sticky sm:bottom-0 sm:h-[8vh] sm:w-full sm:pt-0 sm:flex sm:flex-row sm:justify-around sm:items-center bg-gray-900 sm:opacity-100 sm:z-[300] sm:overflow-hidden`}>
      
      <NavIcons Icon={HomeSharpIcon} title='Home' />
      <NavIcons Icon={ManageHistorySharpIcon} title='History' />
      <NavIcons Icon={EditNoteIcon} title='Notes' />
      <NavIcons Icon={PaidIcon} title='Converter' />
      <NavIcons Icon={PersonSharpIcon} title='Profile' />
      
      <div className='block absolute bottom-3 right-2 sm:hidden' onClick={handleCloseClick}>
        <h3 className='px-3 py-1 bg-red-600 rounded-md text-white text-[10px] '>Close</h3>
      </div>
    </div>
  )
}

export default NavigationBar
