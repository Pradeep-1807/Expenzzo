import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../store/authSlice'
import { setRecordsHistory} from '../store/accountSlice'
import databaseService from '../appwrite/database'
import conf from '../conf/conf'
import categories from '../utils/categories'
import { collectionConf } from '../conf/conf'
import { Query } from 'appwrite'
import '../App.css'
import HistoryTable from '../components/HistoryTable'
import { nanoid } from 'nanoid'
import AlertBox from '../components/AlertBox'

const History = () => {

  const totalIncome = useSelector((state)=>state.account.totalIncome)
  const totalExpense = useSelector((state)=>state.account.totalExpense)
  const recordDetails = useSelector((state)=>state.account.recordsHistory)

  const [ history, setHistory ] = useState(()=>{
    const records = localStorage.getItem('history')
    return records!== null ? JSON.parse(records) : { income: null, expense: null }
  })

  const [ alertMessage, setAlertMessage ] = useState(['',''])

  const dispatch = useDispatch()


  //local storage settings
  // {
  //   income:null,
  //   expense: null
  // }
  const authData = useSelector((state)=> state.auth.userData)
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

  console.log('history :: ',history)


  // const fetchHistory = async ()=>{
  //   if (authData){
  //     try {
  //       const query = [Query.equal("user_id", [authData.email || authData.providerUid]),Query.orderDesc("updated_on")];
  //       const allDocuments = await databaseService.getAllDocuments(
  //         conf.appwriteBalanceAmountId,
  //         query
  //       )

  //       if (allDocuments){
  //         const { documents } = allDocuments;
  //         console.log(documents)
  //         setHistory((prev)=>({...prev, income:documents}))
  //       }


  //       const expQuery = [Query.equal("user_id", [authData.email || authData.providerUid]),Query.orderDesc("updated_on")];
  //       const promises = categories.map(async (category) => {
  //         const collectionId = 'appwrite' + category + 'Id';
  //         return await databaseService.getAllDocuments(
  //           collectionConf[collectionId],
  //           expQuery
  //         );
  //       });
  //       const expDocument = await Promise.all(promises);
        
  //       setHistory((prev)=>({...prev,expense:expDocument}))
  //       dispatch(setRecordsHistory({income:allDocuments.documents, expense:expDocument}))
          
  //     } catch (error) {
        
  //     }
  //   }
  // }

  
  

  // useEffect(()=>{
  //   const records = localStorage.getItem('history')
  //   if (records===null){
  //     fetchHistory()
  //   }
  //   else{
  //     setHistory(JSON.parse(records))
  //   }
  // },[])

  // useEffect(()=>{
  //   if (history!==null){
  //     localStorage.setItem('history',JSON.stringify(history))
  //   }
  // },[history])

  useEffect(()=>{
    setHistory(recordDetails)
    localStorage.setItem('history',JSON.stringify(recordDetails))
  },[recordDetails])

  return (
    <div className='min-h-screen pt-[12vh] relative'>
      <div className='h-[8vh] bg-slate-800 flex items-center mx-5 sm:mx-10'>
        <h2 className='text-white text-lg sm:text-2xl  font-bold '>HISTORY</h2>
      </div>

      <div className='mx-5 sm:mx-10 min-h-full mt-4 sm:mt-8'>
        
        <div >
          <h3 className='text-base sm:text-xl text-white font-bold'>INCOME <span className='text-[14px] ml-3 sm:text-lg text-white font-bold'>[{totalIncome}]</span></h3>
          <div className='overflow-x-scroll xl:overflow-x-hidden'>
            {history.income && <HistoryTable  sourceContent={ history.income} history={history} setHistory={setHistory} setAlertMessage={setAlertMessage} />}
          </div>
        </div>




        <div className='mt-4 sm:mt-8'>
          <h3 className='text-base sm:text-xl text-white font-bold'>EXPENSE <span className='text-[14px] ml-3 sm:text-lg text-white font-bold'>[{totalExpense}]</span></h3>
          <div className='overflow-x-scroll xl:overflow-x-hidden'>
          {
            history.expense &&
            history.expense.map((current,index) => {
              const { documents } = current;
              
              return <HistoryTable key={nanoid()} sourceContent={documents} history={history} setHistory={setHistory} index={index} setAlertMessage={setAlertMessage}  />;
            })
          }

          </div>
        </div>

      </div>

      <AlertBox message={alertMessage[0]} color={alertMessage[1]}/>
    </div>
  )
}

export default History
