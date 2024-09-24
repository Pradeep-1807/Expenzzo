import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalIncome:0,
    totalExpense:0,
    balanceAmount:0,
    recordsHistory:{
        income:[],
        expense: Array(11).fill(null).map(() => ({ documents: [] }))
    },
    showInputBox: false,
    menubarClicked:false
}


const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        setAmount:(state,action)=>{
            state.balanceAmount = action.payload
        },
        setTotalIncome: (state,action)=>{
            state.totalIncome = action.payload
        },
        setTotalExpense : (state,action)=>{
            state.totalExpense = action.payload
        },
        addAmount:(state,action)=>{
            state.balanceAmount = state.balanceAmount + action.payload
        },
        lessAmount:(state,action)=>{
            state.balanceAmount = state.balanceAmount - action.payload
        },
        // addIncomeRecord: (state, action) => {
        //     state.recordsHistory.income.push(action.payload);
        // },
        // addExpenseRecord: (state, action) => {
        //     const { index, record } = action.payload;
            
        //     // Check if the index is valid
        //     if (index >= 0 && index < state.recordsHistory.expense.length) {
        //         // Push the record into the documents array of the specified index
        //         state.recordsHistory.expense[index].documents.push(record);
        //     } else {
        //         // Optionally handle the case where the index is out of range
        //         console.error('Index out of range for expense array');
        //     }
        // },
        setRecordsHistory: (state,action)=>{
            state.recordsHistory = action.payload
        },
        toggleInputBox: (state)=>{
            state.showInputBox = !state.showInputBox
        },
        toggleMenubarClicked :(state) =>{
            state.menubarClicked = !state.menubarClicked
        }
    },
})

export const { setAmount, addAmount, lessAmount, setTotalIncome, setTotalExpense, setRecordsHistory, toggleInputBox, toggleMenubarClicked } = accountSlice.actions

export default accountSlice.reducer

