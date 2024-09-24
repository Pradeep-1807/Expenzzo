import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import databaseService from '../appwrite/database';
import categories from '../utils/categories';
import { collectionConf } from '../conf/conf';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { lessAmount, setRecordsHistory, setTotalExpense } from '../store/accountSlice';

const RecordExpenseForm = ({ isExpenseFormOpen, setIsExpenseFormOpen, title, setBalanceAmount, setAlertMessage }) => {

    const expenseFormStyle = isExpenseFormOpen ? 'opacity-100 z-[120]' : 'opacity-0 -z-[120]';
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const collectionId = 'appwrite' + title + 'Id';

    const authInfo = useSelector((state) => state.auth.userData);
    const totalExpense = useSelector((state)=>state.account.totalExpense)
    const recordsHistory = useSelector((state) => state.account.recordsHistory);

    useEffect(() => {
        setValue('source', title);
    }, [title, setValue]);

    function handleCloseClick() {
        setIsExpenseFormOpen(prev => !prev);
    }

    async function submitForm(data) {
        console.log(data);
        try {
            data.user_id = authInfo.providerUid || authInfo.email;
            data.added_amount = parseFloat(data.added_amount);
            data.updated_on = new Date().toISOString();
            if (!data.description) {
                data.description = 'Nil';
            }

            const document = await databaseService.addInfo(
                collectionConf[collectionId],
                data
            );

            setAlertMessage(['Expense recorded Successfully', 'rgb(228, 25, 49)']);
            setTimeout(() => {
                setAlertMessage(['', '']);
            }, 3000);

            setBalanceAmount(prev => prev - data.added_amount);
            dispatch(lessAmount(data.added_amount));

            const expenseList = recordsHistory.expense.map((cur, index) => {
                if (title === categories[index]) {
                    return {
                        ...cur,
                        documents: [document, ...cur.documents]
                    };
                }
                return cur;
            });

            const updatedRecordsHistory = { ...recordsHistory, expense: expenseList };
            dispatch(setTotalExpense(totalExpense+data.added_amount))
            dispatch(setRecordsHistory(updatedRecordsHistory));
            reset();

        } catch (error) {
            console.error('Error submitting form:', error);
            setAlertMessage(['Failed to record expense', 'rgb(228, 25, 49)']);
            setTimeout(() => {
                setAlertMessage(['', '']);
            }, 3000);
        }
    }

    return (
        <div className={`fixed flex flex-col gap-5 justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5 sm:p-10 m-auto h-[450px] sm:h-[500px] w-[80%] sm:w-[60%] rounded-lg scale-110 duration-300 border-2 border-gray-400 bg-slate-800 ${expenseFormStyle}`}>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-100'>Record Expense</h2>
            <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-5' noValidate>
                <div className='flex flex-col gap-[2px]'>
                    <label htmlFor='added_amount' className='text-lg sm:text-2xl font-semibold text-gray-400'>Amount <span className='text-xl text-red-500'>*</span></label>
                    <input
                        type="text"
                        {...register('added_amount', {
                            required: 'Enter a Valid amount',
                            pattern: {
                                value: /^\d+(\.\d*)?$/,
                                message: 'Amount should contain only digits and period'
                            }
                        })}
                        className='h-[40px] sm:h-[60px] w-full sm:w-[75%] border-black rounded-xl px-3 text-2xl sm:text-4xl focus-within:border-2 focus-within:border-purple-700 outline-none'
                        placeholder='1000'
                    />
                    <p className='text-red-700 font-bold'>{errors?.added_amount?.message}</p>
                </div>
                <div className='flex flex-col gap-[2px]'>
                    <label htmlFor="source" className='text-lg sm:text-2xl font-semibold text-gray-400'>Source <span className='text-xl text-red-500'>*</span></label>
                    <input
                        type="text"
                        defaultValue={title}
                        readOnly
                        {...register('source')}
                        className='h-[40px] sm:h-[60px] w-full sm:w-[75%] border-black rounded-xl px-3 text-2xl sm:text-4xl focus-within:border-2 focus-within:border-purple-700 outline-none'
                    />
                </div>
                <div className='flex flex-col gap-[2px]'>
                    <label htmlFor="description" className='text-lg sm:text-2xl font-semibold text-gray-400'>Description</label>
                    <input
                        type="text"
                        {...register('description')}
                        className='h-[40px] sm:h-[60px] w-full sm:w-[75%] border-black rounded-xl px-3 text-2xl sm:text-4xl focus-within:border-2 focus-within:border-purple-700 outline-none'
                        placeholder=''
                    />
                </div>
                <button
                    type='submit'
                    className='mt-2 bg-purple-800 text-white px-3 py-1 w-[100px] rounded-lg sm:hover:text-purple-800 sm:hover:bg-transparent hover:border-2 sm:hover:border-white'
                >
                    Submit
                </button>
            </form>
            <div className='fixed top-1 right-2 cursor-pointer' onClick={handleCloseClick}>
                <CloseIcon sx={{ backgroundColor: 'red', color: 'white', height: '20px', width: '20px' }} />
            </div>
        </div>
    )
}

export default RecordExpenseForm
