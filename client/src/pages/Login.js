import React, { useEffect, useState } from 'react'
import {login, reset} from '../features/auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import {toast} from 'react-toastify'

function Login() {

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })

 const {user, isSuccess, isError, isLoading, message} = useSelector((state)=>state.auth)

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isError){
      toast.error('Invalid Credentials' || message)
    }

    if(isSuccess && user){
      toast.success('Successfully logged in')
      navigate('/')
    }


    dispatch(reset());

  },[user, isError, isSuccess, dispatch, navigate])

  const onchange = (e) =>{
    setFormData((prevstate)=>({
      ...prevstate,
      [e.target.name] : e.target.value
    }))
  }

  const onsubmit = (e) =>{
    e.preventDefault()
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  }

   if(isLoading){
    return <Loading/>
   }

  return (
    <div className='login'>
        <div className="header">LOGIN <div className='line'></div></div>
        <form onSubmit={onsubmit}>
            <input 
            type="text"
            name='email'
            value={email} 
            onChange={onchange}
            placeholder='Enter Your Email'
            required
            /><hr />
            <input 
             type="password" 
             name='password'
             value={password}
             onChange={onchange}
             placeholder='Enter Your Password'
             required
            /><hr />
            <button className='btn'>LOGIN</button><br />
            <div>
                <p>If You Haven't an Account ? Please
                <span><a href="/register" className='reg'>Register</a></span>
                </p>
            </div>
        </form>
    </div>
  )
}

export default Login