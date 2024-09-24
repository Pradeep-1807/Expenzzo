import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BudgetCard from '../components/BudgetCard'
import AddIncomeBox from '../components/AddIncomeBox'
import { login,logout } from '../store/authSlice'
import { useSelector } from 'react-redux'
import databaseService from '../appwrite/database'
import conf from '../conf/conf'
import { collectionConf } from '../conf/conf'
import { Query } from 'appwrite'
import authService from '../appwrite/auth'
import { setAmount, setTotalIncome, setTotalExpense, setRecordsHistory } from '../store/accountSlice'
import InputBox from '../components/InputBox'
import { useForm } from 'react-hook-form'

import categories from '../utils/categories'
import '../App.css'
import { nanoid } from 'nanoid'
import RecordExpenseForm from '../components/RecordExpenseForm'
import AlertBox from '../components/AlertBox'


const Home = () => {

  const [ showBalanceBox, setShowBalanceBox ] = useState(true)
  const [ showAddIncomeBox, setShowAddIncomeBox ] = useState(false)
  const [ isExpenseFormOpen, setIsExpenseFormOpen ] = useState(false)
  const [ expenseTitle, setExpenseTitle ] = useState('')
  // const [ isAddButtonDisabled, setIsAddButtonDisabled ] = useState(false)
  const [balanceAmount, setBalanceAmount] = useState(() => {
    const storedBalance = localStorage.getItem('balanceAmount');

    return storedBalance !== null ? JSON.parse(storedBalance) : null;
  });
  const [ alertMessage, setAlertMessage ] = useState(['',''])

  const dispatch = useDispatch()

  const menubarClicked = useSelector((state)=>state.account.menubarClicked)
  
  // styles
  const homeStyleForMenubarClicked = menubarClicked ? 'hidden' : 'block'  
  const balanceBoxClass = showBalanceBox ? 'opactiy-100 z-[70]' : 'opacity-0 -z-[70]'
  const showButtonClass = showBalanceBox ? 'opacity-0 -z-[70]' : 'opactiy-100 z-[70]' 
  

  //Click handlers
  function handleCloseClick(){
    setShowBalanceBox(prev => !prev)
   
  }

  const addIncomeBox = () => {
    setShowAddIncomeBox((prev) => !prev); 
  };

 

  //local storage settings
  const authData = useSelector((state)=> state.auth.userData)
  const recordDetails = useSelector((state)=>state.account.recordsHistory)
  // if (!authData) {
  //   dispatch(logout())
  //   localStorage.clear()
  // }
  
  useEffect(()=>{
    const authData = JSON.parse(localStorage.getItem('authData'))
    if (authData){
      dispatch(login(authData))
    }

    
  },[])


  useEffect(()=>{
    localStorage.setItem('authData',JSON.stringify(authData))
  },[authData])

  
  const fetchedBalance = async ()=>{
    if (authData){
      try {
        const query = [Query.equal("user_id", [authData.email || authData.providerUid]),Query.orderDesc("updated_on")];
        const allDocuments = await databaseService.getAllDocuments(
          conf.appwriteBalanceAmountId,
          query
        )
        

        if (allDocuments){
          const { documents } = allDocuments
          const totalAmount = documents.reduce((acc,cur)=>{
            acc += cur.added_amount
            return acc
          },0)

          const expQuery = [Query.equal("user_id", [authData.email || authData.providerUid]),Query.orderDesc("updated_on")];
          const promises = categories.map(async (category) => {
            const collectionId = 'appwrite' + category + 'Id';
            return await databaseService.getAllDocuments(
              collectionConf[collectionId],
              expQuery
            );
          });
          const expDocument = await Promise.all(promises);

          dispatch(setRecordsHistory({income:allDocuments.documents, expense:expDocument}))
          

          const totalExpense = expDocument.reduce((acc, cur)=>{
            const {documents} = cur;
            acc += documents.reduce((accc,curr)=>{
              accc += curr.added_amount
              return accc
            },0)

            return acc
          },0)
          console.log('total amount',totalAmount,'\ntotal expense',totalExpense)
          const balance = totalAmount - totalExpense
          dispatch(setAmount(balance))
          dispatch(setTotalIncome(totalAmount))
          dispatch(setTotalExpense(totalExpense))
          setBalanceAmount(balance)
        }

      } catch (error) {
        console.log('fetchBalance :: ',error)
      }

    }
  }

  

  useEffect(() => {
    const storedBalance = localStorage.getItem('balanceAmount');
    const records = localStorage.getItem('history')

    if (storedBalance === null || records===null) {
      fetchedBalance();
    } else {
      setBalanceAmount(JSON.parse(storedBalance));
      setRecordsHistory(JSON.parse(records))
    }

    // if (records===null){
    //   fetchHistory()
    // }
    // else{
    //   setHistory(JSON.parse(records))
    // }

  }, []);

  useEffect(() => {
    if (balanceAmount !== null) {
      localStorage.setItem('balanceAmount', JSON.stringify(balanceAmount));
    }
  }, [balanceAmount]);

  useEffect(() => {
    if (recordDetails !== null) {
      localStorage.setItem('history', JSON.stringify(recordDetails));
    }
  }, [recordDetails]);



  return (
    <>
    <div className={`min-h-screen  gap-10 px-5 sm:px-10  pt-[12vh] overflow-x-hidden relative`} >


      <h2 className={`text-white text-base sm:text-2xl my-2 font-bold sm:block  ${ homeStyleForMenubarClicked }`}>RECORD EXPENSES</h2>
      <div className={`flex flex-wrap gap-5 sm:flex ${ homeStyleForMenubarClicked } `}>

        {
        categories.map((category)=>(
          <BudgetCard key={nanoid()} title={category} setIsExpenseFormOpen={setIsExpenseFormOpen}setExpenseTitle={setExpenseTitle} />
        ))
        }

        <RecordExpenseForm 
          title={expenseTitle} 
          isExpenseFormOpen={isExpenseFormOpen} 
          setIsExpenseFormOpen={setIsExpenseFormOpen}
          setBalanceAmount={setBalanceAmount}
          setAlertMessage={setAlertMessage}/>

      </div>



      <div className={`flex justify-center  items-end mt-5 sm:flex ${balanceBoxClass} ${ homeStyleForMenubarClicked } fixed bottom-4  sm:bottom-[12vh] right-4`}   >
        <div className=' w-auto h-[30%] bg-white rounded-md m-auto p-7 sm:p-12  flex flex-col items-start gap-1 sm:gap-3 '>
          <button 
            className='bg-green-500 text-white px-2 py-1 rounded-md absolute top-2 right-2 text-sm sm:text-base' 
            onClick={addIncomeBox}
            disabled={false}
            >Add</button>
          <button 
            className='bg-red-500 text-white px-2 py-1 rounded-md absolute top-2 left-2 text-sm sm:text-base'
            onClick={handleCloseClick}
            >Hide</button>
          
          <h3 className='text-gray-400 text-base  sm:text-xl mt-5 sm:m-0'>{'Current Balance'}</h3>
          <h2 className='text-2xl sm:text-4xl font-semibold font-josefin'>{balanceAmount ? balanceAmount.toLocaleString("en-IN", {style:"currency", currency:"INR"}) : '₹0.00' }</h2>
        </div>
      </div> 
      
      <button 
        className={`px-2 py-1  bottom-2 fixed sm:bottom-[12vh] ${showButtonClass} sm:block ${ homeStyleForMenubarClicked } right-4 bg-yellow-400 rounded-md text-sm sm:text-base`}
        onClick={handleCloseClick}
        >Show</button>


      <AddIncomeBox  
          showAddIncomeBox={showAddIncomeBox} 
          setShowAddIncomeBox={setShowAddIncomeBox}
          setBalanceAmount={setBalanceAmount}
          setAlertMessage={setAlertMessage} />


      <AlertBox message={alertMessage[0]} color={alertMessage[1]}/>

    </div>
    </>
   
  )
}

export default Home


