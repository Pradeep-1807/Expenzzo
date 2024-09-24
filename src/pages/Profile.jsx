import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import ProfileCard from '../components/ProfileCard';
import categories from '../utils/categories';
import getFirstName from '../utils/getFIrstName';
import { login, logout } from '../store/authSlice'

const Profile = () => {

  const [ history, setHistory ] = useState(()=>{
    const records = localStorage.getItem('history')
    return records!== null ? JSON.parse(records) : { income: null, expense: null }
  })
  const recordDetails = useSelector((state)=>state.account.recordsHistory)
  const dispatch = useDispatch()

  

  function handleLogoutClick(){
    dispatch(logout())
    localStorage.clear()
  }

  
  

  
  //local storage settings
  const authData = useSelector((state)=> state.auth.userData)
  console.log(authData) 
  
  useEffect(()=>{
    const authData = JSON.parse(localStorage.getItem('authData'))
    if (authData){
      dispatch(login(authData))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('authData',JSON.stringify(authData))
  },[authData])

  const totalIncome = useSelector((state)=>state.account.totalIncome)
  const totalExpense = useSelector((state)=>state.account.totalExpense)
  console.log('authData ',authData)

  console.log('Profile total Income',totalIncome,'\nProfile total Expense',totalExpense)

  useEffect(()=>{
    setHistory(recordDetails)
    localStorage.setItem('history',JSON.stringify(recordDetails))
  },[recordDetails])

  const { expense, income } = history
  const expenseDetails = expense.reduce((acc, cur, index) => {
    if (cur.documents.length > 0) {
      const key = categories[index];
      const totalSum = cur.documents.reduce((acc,cur)=>{
        acc+=cur.added_amount

        return acc
      },0)

      const newObj = {[key]:totalSum}
      acc.push(newObj)
    }
    return acc; 
  }, []);
  
  console.log('expenseDde',expenseDetails)
  console.log('Profile History ',history)

  console.log()

  return (
    <div className='min-h-screen w-full pt-[12vh] relative px-5 sm:px-10'>
      <div className='h-[8vh] bg-slate-900 flex justify-between items-center  mb-8 '>
        <h2 className='text-white text-lg sm:text-3xl  font-bold italic '>Hello {authData && getFirstName(authData.name)}</h2>
        <div className='mr-5 flex flex-col items-center cursor-pointer text-gray-400  hover:text-white group' onClick={handleLogoutClick}>
          <PowerSettingsNewSharpIcon sx={{color:'white',fontSize: {
                    xs: '20px',  
                    sm: '25px',  
                     
                }}}  />
          <h3 className='text-gray-400 text-base group-hover:text-white' >Logout</h3>
        </div>
      </div>

      <div className='h-full w-full flex justify-center md:justify-start flex-wrap  gap-10 md:gap-16 pb-5 mt-5 md:mt-10'>
        <ProfileCard source='INCOME' totalAmount={totalIncome} />
        <ProfileCard source='EXPENSE' totalAmount={totalExpense} />
      </div>

    </div>
  )
}

export default Profile
