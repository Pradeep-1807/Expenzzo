import React, { useState } from 'react'
import '../App.css'
import RecordExpenseForm from './RecordExpenseForm'


const BudgetCard = ({title,setIsExpenseFormOpen, setExpenseTitle}) => {

  
  function handleBudgetCardClick(){
    setIsExpenseFormOpen((prev)=>!prev)
    setExpenseTitle(title)
  }

  return (
    <div 
      onClick={handleBudgetCardClick}
      className='flex flex-col justify-center items-center h-[75PX] w-[100px] sm:h-[150px] sm:w-[175px] shadow-gray-800 shadow-lg bg-slate-300 rounded-xl cursor-pointer'>
      <h1 className='text-sm sm:text-xl font-josefin'>{title}</h1>
    </div>
  )
}

export default BudgetCard
