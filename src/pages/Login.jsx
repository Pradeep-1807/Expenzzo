import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import BackgroundImg from '../assets/images/BackgroundImg.jpg'
import '../../src/App.css'

const Login = () => {

  const form = useForm()
  const { register, handleSubmit, formState} = form
  const { errors } = formState

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const authStatus = useSelector((state) => state.auth.status);

  const isSessionAvailable = async () => {
    
      const session = await authService.getCurrentUser();
      if (session) {
        console.log("session is present already so directly logged in")
        dispatch(login(session)); 
      } else {
        console.log('Login to move further')
        navigate('/login');
      }
    
  };

  useEffect(() => {
    isSessionAvailable();
    console.log('status from Login :', authStatus);
  }, []);



  const loginSubmit = async (data) =>{
    console.log('raw data',data)
    
    try {
      const session = await authService.login(data)
      console.log(session)
      if (session){    
        console.log('session created')
        dispatch(login(session))
        navigate('/home')
      }
    } catch (error) {
      console.log('loginSubmit() :: ', error)
    }
  }

  // style={{
  //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${BackgroundImg})`
  // }}

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-cover bg-center'>
       <form 
        id='login-form'
        onSubmit={handleSubmit(loginSubmit)} 
        className='h-auto w-[80%] sm:w-[40%] mt-16  px-5 py-3 sm:py-5 sm:px-10 flex flex-col  gap-5 border border-white  rounded-md  '
        noValidate>
        
        <h2 className='text-white text-xl sm:text-3xl inline-block  m-auto '>Login</h2>

        
        
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

        

        <div id='login-button'>
          <button className='px-3 py-1 bg-yellow-400 rounded-md text-gray-800 hover:bg-transparent hover:text-white duration-300 hover:border-2 hover:border-yellow-400' >Submit</button>
        </div>


      </form>
    </div>
  )
}

export default Login
