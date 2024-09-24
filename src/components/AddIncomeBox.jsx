import React from 'react'
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import databaseService from '../appwrite/database';
import { useDispatch } from 'react-redux';
import { addAmount, setRecordsHistory, setTotalIncome, setTotalExpense} from '../store/accountSlice';
import conf from '../conf/conf';
import { collectionConf } from '../conf/conf';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

const AddIncomeBox = ({showAddIncomeBox, setShowAddIncomeBox, setBalanceAmount, setAlertMessage }) => {


  const dispatch = useDispatch()
  const authInfo = useSelector((state)=> state.auth.userData)
  const totalIncome = useSelector((state)=>state.account.totalIncome)
  const recordsHistory = useSelector((state)=>state.account.recordsHistory)
  

  const { register, handleSubmit,  reset, formState } = useForm()
  const { errors } = formState

  
  const addIncomeBoxStyle = showAddIncomeBox ? 'opacity-100 z-[120]' : 'opacity-0 -z-[120]'
  
  

  async function submitForm(data) {
    try {
      data.user_id = authInfo.providerUid || authInfo.email;
      data.added_amount = parseFloat(data.added_amount);
      data.updated_on = new Date().toISOString();
      if (!data.description){
        data.description='Nil'
      }

      const document = await databaseService.addInfo(
        conf.appwriteBalanceAmountId,
        data
      );
      console.log('added income document ',document)

      const updatedRecordsHistory = {...recordsHistory,income:[document,...recordsHistory.income]}
      setAlertMessage(['Income recorded Successfully','rgb(19, 164, 43)'])
        setTimeout(() => {
            setAlertMessage(['',''])
        }, 3000);

      setBalanceAmount((prev)=>prev+data.added_amount)
      dispatch(addAmount(data.added_amount))
      dispatch(setTotalIncome(totalIncome + data.added_amount))
      dispatch(setRecordsHistory(updatedRecordsHistory))
      
      reset()
      handleCloseClick()

      

    } catch (error) {
        console.error('Error submitting form:', error);
    }
  }

  function handleCloseClick(){
    setShowAddIncomeBox((prev)=>!prev)
    reset()
  }


  return (
    <div className={`fixed flex flex-col gap-5 justify-center  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5 sm:p-10 m-auto h-[450px] sm:h-[500px] w-[80%] sm:w-[60%] rounded-lg scale-110 duration-300 border-2 border-gray-400 bg-slate-800 ${addIncomeBoxStyle}`} >
        
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-100'>Record Income</h2>

        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-5' noValidate>

          <div className='flex flex-col gap-[2px]'>
              <label htmlFor="amount" className='text-lg sm:text-2xl font-semibold text-gray-400'>Amount <span className='text-xl text-red-500'>*</span></label>
              <input 
              type="text" 
              {...register('added_amount',{
                required:'Enter a Valid amount',
                
                pattern:{
                  value:/^\d+(\.\d*)?$/,
                  message:'amount should contain only digits and period'
                }
              })}
              className='h-[40px] sm:h-[60px] w-full sm:w-[75%] border-black rounded-xl px-3 text-2xl sm:text-4xl focus-within:border-2 focus-within:border-purple-700 outline-none' 
              placeholder='10000' 
              />
              <p className='text-red-700 font-bold'>{errors?.added_amount?.message}</p>
          </div>

         <div className='flex flex-col gap-[2px]'>
              <label htmlFor="source" className='text-lg sm:text-2xl font-semibold text-gray-400'>Source <span className='text-xl text-red-500'>*</span></label>
              <input 
              type="text" 
              {...register('source')}
              className='h-[40px] sm:h-[60px] w-full sm:w-[75%] border-black rounded-xl px-3 text-2xl sm:text-4xl focus-within:border-2 focus-within:border-purple-700 outline-none' 
              value='Income' 
              readOnly
              />
              <p className='text-red-700 font-bold'>{errors?.source?.message}</p>
          </div>

          <div className='flex flex-col gap-[2px]'>
              <label htmlFor="amount" className='text-lg sm:text-2xl font-semibold text-gray-400'>Description</label>
              <input 
              type="text" 
              {...register('description')}
              className='h-[40px] sm:h-[60px] w-full sm:w-[75%] border-black rounded-xl px-3 text-2xl sm:text-4xl focus-within:border-2 focus-within:border-purple-700 outline-none' 
              placeholder='desc' 
              />
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

export default AddIncomeBox
