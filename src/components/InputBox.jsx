import React from 'react'


const InputBox = ({showInputBox}) => {

    const customClass = showInputBox ? 'z-50 opacity-100' : '-z-10 opacity-0'

    

  return (
    <div className={`h-[40%] bg-gray-400 w-[40%] flex justify-start items-center  absolute bottom-[10vh] right-10 p-5 sm:p-10  rounded-xl ${customClass} transition-all duration-300`} onClick={()=>console.log('box clicked ')} >
      <div className='flex flex-col justify-center items-start gap-10 h-[80%] bg-slate-100'>
      <button><span>+</span>Add Income</button>
      <button><span>-</span>Add Expence</button>
      </div>
    </div>
  )
}

export default InputBox
