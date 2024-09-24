import React from 'react'

const ProfileCard = ({source, totalAmount}) => {

  return (
    <div className={`w-[90%] h-[200px] md:w-[310px] lg:w-[400px] xl:w-[450px] md:h-[300px]  rounded-xl p-5 sm:p-10 ${source==='INCOME' ? 'bg-green-400' : 'bg-rose-500'} flex flex-col justify-center items-center gap-5`}  >
      <h2 className='text-lg sm:text-2xl font-bold text-gray-600'>TOTAL {source} </h2>
      <h1 className='text-3xl sm:text-5xl font-semibold  '>{totalAmount && totalAmount.toLocaleString("en-IN", {style:"currency", currency:"INR"})}</h1>
    </div>
  )
}

export default ProfileCard
