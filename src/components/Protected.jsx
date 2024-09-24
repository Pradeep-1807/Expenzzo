import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({children ,authentication = true}) => {

  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()

  useEffect(()=>{
    if (authentication && authStatus !== authentication){
      navigate('/')
    }
    if(!authentication && authStatus !== authentication){
      navigate('/home')
    }  

  },[authStatus,authentication,navigate])
  
  return (
    <>
    {children}
    </>
  )
}

export default Protected
