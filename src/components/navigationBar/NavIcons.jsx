import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleMenubarClicked } from '../../store/accountSlice'

const NavIcons = ({Icon,title}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleNavigation(){
    navigate(`${title.toLowerCase()}`)
    dispatch(toggleMenubarClicked())
  }

  return (
    <div className='flex flex-col cursor-pointer p-3 ' onClick={handleNavigation}>
      <button className='text-gray-400 hover:text-white group flex justify-start gap-1 sm:flex-col sm:items-center sm:gap-0 p-2 sm:p-0 hover:bg-blue-800 sm:hover:bg-transparent rounded-md'>
        <Icon sx={{fontSize: {
                    xs: '20px',  
                    sm: '30px',  
                     
                },}}  />
        <h3 className='text-sm sm:text-lg text-gray-600  hover:text-white group-hover:text-white '>{title}</h3>
      </button>
    </div>
  )
}

export default NavIcons
