import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import NoteDeleteBox from './NoteDeleteBox';
import databaseService from '../appwrite/database';
import conf from '../conf/conf';

const Note = ({title, description, time, id, setNoteId, setIsNoteDeleteBoxOpen}) => {

  async function handleDeleteClick() {
    setIsNoteDeleteBoxOpen(true); 
    setNoteId(id)
  }

  return (
    <>
      <div className='h-auto w-[200px] sm:w-[400px] relative bg-slate-400 p-2 sm:p-5 gap-1 sm:gap-2 flex flex-col rounded-lg cursor-pointer overflow-hidden'>
        <h2 className='text-gray-700 text-2xl sm:text-3xl font-semibold'>{title}</h2>
        <p className='text-gray-500 text-lg sm:text-2xl mb-5 leading-6'>{description}</p>
        <p className='text-gray-500 text-sm sm:text-lg sm:absolute sm:bottom-2 '>{time}</p>
        <div className='sm:absolute sm:bottom-2 sm:right-2' onClick={handleDeleteClick}>
          <DeleteIcon sx={{color:'red'}} />
        </div>
      </div>
    </>
  )
}

export default Note;
