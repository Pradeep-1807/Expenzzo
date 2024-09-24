import React, { useEffect, useState } from 'react'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import databaseService from '../appwrite/database';
import conf from '../conf/conf';
import { useDispatch, useSelector } from 'react-redux';
import { collectionConf } from '../conf/conf';
import formatTime from '../utils/formatTime';
import '../App.css'
import { addAmount, lessAmount, setAmount, setTotalIncome, setTotalExpense, setRecordsHistory } from '../store/accountSlice';


const SingleRecord = ({id, userId, amount, source, description, time, history, setHistory, index, setAlertMessage}) => {

    const [ recordDetails, setRecordDetails ] = useState({
        userId:userId,
        amount:amount,
        source:source,
        description:description,
        time:time
    })
    const [ isEditable, setIsEditable ] = useState(false)
    const [ editableData, setEditableData ] = useState({})
    const dispatch = useDispatch()

    const balanceAmount = useSelector((state)=>state.account.balanceAmount)
    const totalIncome = useSelector((state)=>state.account.totalIncome)
    const totalExpense = useSelector((state)=>state.account.totalExpense)
    const recordsHistory = useSelector((state)=>state.account.recordsHistory)

    
    function handleInputChange(e){
        e.preventDefault()
        const {name, value} = e.target
        setRecordDetails((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
        
    }

    async function hanldeEditClick(){
        
        if (source === 'Income'){
            const recordData = await databaseService.getInfo(
                conf.appwriteBalanceAmountId,
                id
            )
            setEditableData(recordData)
        }
        else{
            const collectionId = 'appwrite'+source+'Id'
            const recordData = await databaseService.getInfo(
                collectionConf[collectionId],
                id
            )
            setEditableData(recordData)
            console.log(recordData)
        }
        setIsEditable(true)
        console.log('index :', index)
        
    }

    async function handleUpdateClick() {
        const { added_amount, description: desc } = editableData;
        const { amount, description } = recordDetails;
    
        if (parseFloat(added_amount) !== parseFloat(amount) || desc !== description) {
            // const newDate = new Date().toISOString()
            const newObj = {
                added_amount: parseFloat(recordDetails.amount),
                description: recordDetails.description,
                updated_on: new Date().toISOString()
            };
    
            if (source === 'Income') {
                try {
                    await databaseService.updateInfo(
                        conf.appwriteBalanceAmountId,
                        id,
                        newObj
                    );
                    setAlertMessage(['Income updated Successfully','rgb(254, 228, 30)'])
                    setTimeout(() => {
                        setAlertMessage(['',''])
                    }, 3000);
                    const updatedIncomeList = history.income &&  history.income.map((cur) => {
                        if (id === cur.$id) {
                            return {
                                ...cur,
                                added_amount: newObj.added_amount,
                                description: newObj.description,
                                updated_on: newObj.updated_on
                            };
                        }
                        return cur;
                    });
                    
                    setRecordDetails((prev)=>(
                        {
                            ...prev,
                            time: newObj.updated_on
                        }
                    ))

                    const newIncomeList = {...history, income:updatedIncomeList}
                    setHistory(newIncomeList);
                    dispatch(setRecordsHistory(newIncomeList));
                    
                    const difference = parseFloat(added_amount) - parseFloat(amount);
                    dispatch(setTotalIncome(totalIncome-difference))
                    const newBalanceAmount = balanceAmount - difference;
    
                    localStorage.setItem('balanceAmount', JSON.stringify(newBalanceAmount));
                    dispatch(setAmount(newBalanceAmount));
                    
                    localStorage.setItem('history',JSON.stringify(newIncomeList))
    
                } catch (error) {
                    console.error('Error updating record:', error);
                }
    
            }else {
                const collectionId = 'appwrite' + source + 'Id';
                try {
                    
                    await databaseService.updateInfo(
                        collectionConf[collectionId],
                        id,
                        newObj
                    );
                    setAlertMessage(['Expense updated Successfully','rgb(254, 228, 30)'])
                    setTimeout(() => {
                        setAlertMessage(['',''])
                    }, 3000);

                    const updatedSingleExpenseList = history.expense[index].documents.map((cur) => {
                        if (id === cur.$id) {
                            return {
                                ...cur,
                                added_amount: newObj.added_amount,
                                description: newObj.description,
                                updated_on: newObj.updated_on,
                            };
                        }
                        return cur;
                    });
                    const updatedExpenseList = history.expense.map((item, i) => {
                        if (i === index) {
                            return { ...item, documents: updatedSingleExpenseList };
                        }
                        return item;
                    });

                    const newExpenseList = {...history, expense:updatedExpenseList}
    
                    setHistory(newExpenseList);
                    dispatch(setRecordsHistory(newExpenseList));

                    const difference = parseFloat(amount) - parseFloat(added_amount);
                    dispatch(setTotalExpense(totalExpense+difference))
                    const newBalanceAmount = balanceAmount - difference;
    
                    localStorage.setItem('balanceAmount', JSON.stringify(newBalanceAmount));
                    dispatch(setAmount(newBalanceAmount));
                    
                } catch (error) {
                    console.error('Error updating expense:', error);
                }
            }
        }
    
        setIsEditable(false);
    }
    


    async function handleDeleteClick(){
        if (source=='Income'){
            await databaseService.deleteInfo(
                conf.appwriteBalanceAmountId,
                id
            )
            setAlertMessage(['Income deleted Successfully','rgb(228, 25, 49)'])
            setTimeout(() => {
                setAlertMessage(['',''])
            }, 3000);

            const updatedIncomeList = history.income.filter((cur)=>cur.$id!==id)
            setHistory((prev)=>(
                {
                    ...prev,
                    income:updatedIncomeList
                }
            ))

            const balance = balanceAmount - amount
            localStorage.setItem('balanceAmount',JSON.stringify(balance))
            dispatch(setTotalIncome(totalIncome-amount))
            dispatch(lessAmount(amount))

            localStorage.setItem('history',JSON.stringify(history))
            dispatch(setRecordsHistory({
                ...recordsHistory,
                income:updatedIncomeList
            }))

        }
        else{
            const collectionId = 'appwrite'+source+'Id'
            await databaseService.deleteInfo(
                collectionConf[collectionId],
                id
            )
            setAlertMessage(['Expense deleted Successfully','rgb(228, 25, 49)'])
            setTimeout(() => {
                setAlertMessage(['',''])
            }, 3000);

            const updatedSingleExpenseList = history.expense[index].documents.filter((cur)=>cur.$id!==id)
            const updatedExpenseList = history.expense.map((cur,i)=>{
                if (i===index){
                    return {
                        ...cur,
                        documents:updatedSingleExpenseList
                    }
                }
                return cur
            })
            setHistory((prev)=>(
                {
                    ...prev,
                    expense:updatedExpenseList
                }
            ))
            const balance = balanceAmount + amount
            localStorage.setItem('balanceAmount',JSON.stringify(balance))
            dispatch(setTotalExpense(totalExpense-amount))
            dispatch(addAmount(amount))

            localStorage.setItem('history',JSON.stringify(history))
            dispatch(setRecordsHistory(
                { 
                    ...recordsHistory,
                    expense:updatedExpenseList
                }
            ))
              
        }
    }


  return (
    <tr className='w-full flex justify-around gap-2 my-2  single-record font-josefin '>
        {/* <td><input type="text" name='userId'  value={recordDetails.userId} onChange={handleInputChange} readOnly /></td> */}
        <td><input type="text" name='amount' value={recordDetails.amount} onChange={handleInputChange} readOnly={!isEditable} /></td>
        <td><input type="text" name='source' value={recordDetails.source} onChange={handleInputChange} readOnly /></td>
        <td><input type="text" name='description' value={recordDetails.description} onChange={handleInputChange} readOnly={!isEditable}/></td>
        <td><input type="text" name='time'  value={formatTime(recordDetails.time)} onChange={handleInputChange}  /></td>
        <td className='text-center w-[140px] cursor-pointer text-yellow-400' >
            {isEditable ? <button onClick={handleUpdateClick} type='submit' className='text-white bg-yellow-400 px-2 py-1 rounded-md'>Update</button> : <div onClick={hanldeEditClick}><EditSharpIcon /></div>}
        </td>
        <td className='text-center w-[140px] cursor-pointer text-red-600' onClick={handleDeleteClick}><DeleteSharpIcon /></td> 
    </tr>

  )
}

export default SingleRecord

    
    // function timeFormat(x){
    //     const timestamp = x;
    //     const date = new Date(timestamp);
    //     const offset = 5.5 * 60 * 60 * 1000; 
    //     const istDate = new Date(date.getTime() + offset);
    //     const formattedDate = istDate.toISOString().slice(0, 16).replace('Z', '');
    //     return formattedDate
    // }