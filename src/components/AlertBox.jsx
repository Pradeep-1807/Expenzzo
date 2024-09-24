import React, { useState } from 'react'

const AlertBox = ({message, color}) => {
    if(!message){
        return
    }
    

    const bgColor = `bg-${color}-500`
  return (
    <div style={{backgroundColor:color}} className={`z-[7000] h-auto px-5 sm:px-10 py-3 sm:py-4 sm:w-[40%] w-[90%]  fixed top-10 sm:top-7  right-3  border-black rounded-md`}>
      <h2 className='text-white text-[16px] sm:text-2xl '>{message}</h2>
    </div>
  )
}

export default AlertBox
