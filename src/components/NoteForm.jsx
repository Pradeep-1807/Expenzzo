import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import databaseService from '../appwrite/database';
import conf from '../conf/conf';
import { useForm } from 'react-hook-form';

const NoteForm = ({isNotesFormVisible, setIsNotesFormVisible, setNotesList}) => {

  if(!isNotesFormVisible) return 

    const { register, handleSubmit, setValue, formState:{errors}, reset } = useForm()
    const authData = useSelector((state)=> state.auth.userData);


    async function submitForm(data){
      if (authData){
        try {
          data.user_id = authData.email || authData.providerUid
          data.updated_on = new Date().toISOString();

          const document = await databaseService.addInfo(
            conf.appwriteNotesId,
            data
          )
          setNotesList((prev)=>([document,...prev])) 
          handleCloseClick()
          
        } catch (error) {
          console.log('NotesForm :: ',error)
        }
      }
    }

    function handleCloseClick(){
      setIsNotesFormVisible(false)
      reset()
    }

  return (
    <div className={`fixed flex flex-col gap-5 justify-center  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5 sm:p-10 m-auto h-[450px] sm:h-[500px] w-[80%] sm:w-[60%] rounded-lg scale-110 duration-300 border-2 border-gray-400 bg-slate-800 `} >
        
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-100'>Take a Note</h2>


        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-5' noValidate>

          <div className='flex flex-col gap-[2px]'>
            <label htmlFor='title' className='text-lg sm:text-2xl font-semibold text-gray-400'>Title</label>
            <input 
            type="text" 
            {...register('title')}
            className='h-[40px] sm:h-[60px] w-full sm:w-[75%] border-black rounded-xl px-3  text-xl sm:text-3xl font-semibold focus-within:border-2 focus-within:border-purple-700 outline-none' 
            placeholder='Note' 
            />
          </div>



          <div className='flex flex-col gap-[2px]'>
            <label htmlFor="description" className='text-lg sm:text-2xl font-semibold text-gray-400'>Description<span className='text-xl text-red-500'>*</span></label>
            <textarea
            rows="50" cols="20" 
            type="text" 
            {...register('description',{
              required:'Enter some content',
            })}
            className='h-[40px] sm:h-[60px] w-full sm:w-[75%] border-black rounded-xl px-3 py-2 text-lg sm:text-2xl focus-within:border-2 focus-within:border-purple-700 outline-none' 
            ></textarea>
            <p className='text-red-700 font-bold'>{errors?.description?.message}</p>
          </div>

          

          <button type='submit' 
                  className='mt-2 bg-purple-800 text-white px-3 py-1 w-[100px] rounded-lg sm:hover:text-purple-800 sm:hover:bg-transparent hover:border-2 sm:hover:border-white'
          >Submit</button>

        </form>

        
        
        <div className='fixed top-1 right-2 cursor-pointer ' onClick={handleCloseClick}>
            <CloseIcon sx={{backgroundColor:'red',color:'white',height:'20px',width:'20px'}} />
        </div>

    </div>
  )
}

export default NoteForm
