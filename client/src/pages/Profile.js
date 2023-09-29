import React, { useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import {createProfile} from '../features/profile/profileSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profile() {

  const {user} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if(!user){
    navigate('/login')
  }


  const [data, setData] = useState({
    name: '', 
    fname : '' ,
    dob :' ',
    gender : '',
    mobile : '',
    address : ''
  })

  const {name, fname, dob, gender, mobile, address} = data


  const onchange = (e) =>{
    setData((prevstate)=>({
      ...prevstate,
      [e.target.name] : e.target.value
    }))
  }

  const onsubmit = (e) =>{
    e.preventDefault();
    const profileData = {
      name, 
      fname, 
      dob, 
      gender, 
      mobile, 
      address
    }
    dispatch(createProfile(profileData));
    toast.success('Submission confirmed')
    navigate('/')
    setData('');

  }


  return (
    <div>
      <Header/>
      <div className="form"><br />
        <div className="header_profile">User Form<div className='line'></div></div>
        <form className='profile' onSubmit={onsubmit} >
           <input 
              type="text"
              name='name'
              value={name}
              onChange={onchange}
              placeholder='Your Name'
              required
           /><hr />
           <input 
              type="text"
              name='fname'
              value={fname} 
              onChange={onchange}
              placeholder='Your Father Name' 
              required
           /><hr />
           <input 
              type="date" 
              name='dob'
              style={{display: "block", marginBottom: "10px"}}
              value={dob}
              onChange={onchange}
              placeholder='Your Date Of Birth' 
              required
           /><hr />
           <select name="gender" value={gender}  onChange={onchange} id="" placeholder='Your Gender' required>
            <option value="" selected disabled>Gender</option>
            <option value="male">Male</option>
            <option value="male">Female</option>
            <option value="male">Transgender</option>
           </select><hr />
           <input 
              type="text" 
              name='mobile'
              onChange={onchange}
              value={mobile}
              placeholder='Your Phone No.' 
              required
           /><hr />
           <input 
              type="text" 
              name='address'
              onChange={onchange}
              value={address}
              placeholder='Your Address' 
              required
            /><hr />
           <button className='profile_btn'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}

export default Profile