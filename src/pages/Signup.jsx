import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import BackgroundImg from '../assets/images/BackgroundImg.jpg'
import '../../src/App.css'

const Signup = () => {


  const form = useForm()
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const [ isButtonDisabled, setIsButtonDisabled ] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

 

  const signupSubmit= async (data)=>{
    console.log('raw data',data)  

    console.log('clicked')
    setIsButtonDisabled(true)

    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 3000);
    
    try {
      const userSignup = await authService.createAccount(data)
      if (userSignup){
        const userData = await authService.getCurrentUser()
        if (userData){
          dispatch(login(userData))
          navigate('/home')
        }
      }
    } catch (error) {
      console.log('signupSumbit() :: ',error)
    }

    

  }

  function handleClick(){
    
  }


  // style={{
  //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${BackgroundImg})`
  // }}


  return (
    <div 
      className='min-h-screen w-screen flex justify-center items-center bg-cover bg-center'>

      <form 
        id='signup-form'
        onSubmit={handleSubmit(signupSubmit)} 
        className='h-auto w-[80%] sm:w-[40%] mt-16  px-5 py-3 sm:py-5 sm:px-10 flex flex-col  gap-5 border border-white  rounded-md  '
        noValidate>
        
        <h2 className='text-white text-xl sm:text-3xl inline-block  m-auto '>Sign up</h2>

        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' placeholder='Name' {...register('name',{required:{
            value:true,
            message:'Name is required'
            }})} />
          
          <p>{errors?.name?.message}</p>
        </div>
        
        <div> 
          <label htmlFor="email">Email</label>
          <input type="email" id='email' placeholder='Email' {...register('email',{
            required:'email is required',
            pattern:{
              value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message:'Invalid Email format'
            }
            })} />

          <p>{errors?.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' placeholder='Password' {...register('password',{
            required:'Password is required',
            minLength:{
              value:8,
              message:'Min 8 characters required',
            },
            pattern: {
              value: /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/,
              message: 'Password must include character and  digit'
            }
            })} />
          <p>{errors?.password?.message}</p>
        </div>

        <div>
          <label htmlFor="mobno">Mob no</label>
          <input type="tel"  id='mobno' placeholder='Mobile No' {...register('mobno',{
            required:'mob no is required',
            minLength:{
              value:10,
              message:'Enter a 10 digit Mobno'
            },
            pattern:{
              value:/^\+91 \d{10}$/,
              message:'Only digits allowed'
            }
          })} />

          <p>{errors?.mobno?.message}</p>
        </div>

        <div 
          id='singup-button' >
          <button disabled={isButtonDisabled} className='px-3 py-1 bg-yellow-400 rounded-md text-gray-800 hover:bg-transparent hover:text-white duration-300 hover:border-2 hover:border-yellow-400' >Submit</button>
        </div>


      </form>

    </div>
  )
}

export default Signup
