import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';
import '../App.css';
import CurrencyExchange from '../components/CurrencyExchange';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';


const Converter = () => {
  const [currencyAvailable, setCurrencyAvailable] = useState({});
  const [ rate, setRate ] = useState(0)
  const [currencyInfo, setCurrencyInfo] = useState({
    from: 'USD',
    to: 'INR',
    fromValue: 1,
    toValue: 0,
    errorMessage:''
  });

  const dispatch = useDispatch()

  //local storage settings
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

  

  useEffect(() => {
    fetchData('currencies')
      .then((data) => {
        setCurrencyAvailable(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const { from, to, fromValue, toValue, errorMessage } = currencyInfo;


  function handleSelectChange(e) {
    const { name, value } = e.target;
    setCurrencyInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFromValueChange(e) {
    const { value } = e.target;
    

    if (!isNaN(Number(value))){
      console.log('true not NaN')
      setCurrencyInfo((prev) => ({
        ...prev,
        fromValue: value<=0 ? 0 : Number(value),
        toValue: rate * value
      })); 
    }
    else{
      setCurrencyInfo((prev) => ({
        ...prev,
        fromValue: 1,
        toValue: rate * 1,
        errorMessage:'Only digits allowed'
      })); 

      setTimeout(() => {
        setCurrencyInfo((prev) => ({
          ...prev,
          errorMessage:''
        })); 
      }, 1500);
      
    }
    
  }

  useEffect(() => {
    fetchData(`convert?from=${from}&to=${to}&amount=${1}`)
      .then((data) => {
        setRate(data.result)
        setCurrencyInfo((prev) => ({
          ...prev,
          fromValue:1,
          toValue:data.result,
        }));
      })
      .catch((error) => console.log(error));
  }, [from, to]);


  return (
    <div className="min-h-screen w-full flex justify-center items-center ">
      
      <div className="min-h-[500px] w-[80%] bg-white shadow-md rounded-lg p-3 lg:p-10 flex flex-col gap-10 mt-[10vh] mb-[8vh]">


         <h2 className=' justify-self-center self-center w-auto font-bold  sm:text-2xl text-teal-800 mt-5'>CURRENCY CONVERTER</h2> 
        
        <div className='flex flex-col justify-around lg:flex-row lg:justify-around items-center flex-wrap'>

          <CurrencyExchange
              selectLablelHtmlFor='from'
              selectTitle='From'
              selectName='from'
              selectId='from'
              value={from}       
              errorMessage = {errorMessage}      
              currencyAvailable={currencyAvailable}
              handleSelectChange={handleSelectChange}

              inputLableHtmlFor='fromValue'
              inputValue={fromValue}
              handleFromValueChange={handleFromValueChange}
          />


          <CurrencyExchange 
            selectLablelHtmlFor='to'
            selectTitle='To'
            selectName='to'
            selectId='to'
            value={to}     
            currencyAvailable={currencyAvailable}
            handleSelectChange={handleSelectChange}

            inputLabelHtmlFor='toValue'
            inputValue={toValue}
            readOnly={true}

          />
          
        </div>  
      </div>
    </div>
  );
};

export default Converter;