import React from 'react'
import databaseService from '../appwrite/database'
import conf from '../conf/conf'
import '../App.css'

const NoteDeleteBox = ({isNoteDeleteBoxOpen, setIsNoteDeleteBoxOpen, setNotesList, noteId, setAlertMessage}) => {

    if(!isNoteDeleteBoxOpen) return

    async function handleDeleteClick(){
        await databaseService.deleteInfo(
          conf.appwriteNotesId,
          noteId
        )
        setAlertMessage(['Note deleted','red'])
        setTimeout(()=>{
          setAlertMessage(['',''])
        },3000)
        setNotesList((prev)=>(prev.filter((note)=>(note.$id!==noteId))))
        setIsNoteDeleteBoxOpen(false)
    }

  return (
    <div className='fixed z-[500] flex flex-col justify-center items-center p-5 md:p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 h-[30%] md:h-[40%] w-[80%] md:w-[45%] rounded-lg  '>
      <h3 className='text-gray-500 font-josefin text-xl md:text-3xl font-semibold'>Do you want to <span className='text-red-700'>Delete</span> this note?</h3>
      <div className=' w-full flex justify-evenly mt-7 md:mt-10'>
        <button className='px-5 md:px-8 py-1 sm:py-2  bg-purple-400 rounded-lg' onClick={handleDeleteClick}>Yes</button>
        <button className='px-5 md:px-8 py-1 sm:py-2  bg-purple-400 rounded-lg' onClick={()=>setIsNoteDeleteBoxOpen(false)}>No</button>
      </div>
    </div>
  )
}

export default NoteDeleteBox
