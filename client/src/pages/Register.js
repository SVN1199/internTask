import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loading from '../components/Loading'
import { register, reset } from '../features/auth/authSlice'
import {toast} from 'react-toastify'

function Register() {

  const [formData, setFormData ] = useState({
    name : '',
    email : '',
    password : '',
    password2 : ''
  })
  
  const {name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isSuccess, isLoading ,isError, message} = useSelector((state)=> state.auth)

  useEffect(()=>{
      if(isError){
        toast.error('User Already Exists' || message)
      }

      if(isSuccess && user){
        toast.success('Registration completed')
        navigate('/login')
      }

      dispatch(reset())

    },[user, isError, isSuccess, message, navigate, dispatch])

  const onchange = (e) =>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onsubmit = (e) =>{
    e.preventDefault()
    if(password !== password2){
      toast.error('Password Not Matched')
    }else{
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Loading/>
  }

  return (
    <div>
      <div className='register'>
        <div className="header_register">REGISTRATION <div className='line'></div></div>
        <form onSubmit={onsubmit}>
            <input 
            type="text"
            name='name'
            value={name} 
            onChange={onchange}
            placeholder='Enter Your Name'
            required
            /><hr />
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
            <input 
             type="password"
             name='password2'
             value={password2} 
             onChange={onchange}
             placeholder='Enter Your Confirm Password'
             required
            /><hr />
            <button className='btn'>REGISTER</button><br />
            <div>
                <p>If You Already Have an Account ? Please
                <span><a href="/login" className='reg'>Login</a></span>
                </p>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Register