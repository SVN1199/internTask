import React, { useEffect } from 'react'
import Header from '../components/Header'
import {BiEdit} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../features/profile/profileSlice'
import Loading from '../components/Loading'


function ViewProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((state)=>state.auth)
  const {isError, isLoading , profile, message} = useSelector((state)=>state.profile)

  if (!user) {
    navigate('/login');
  }

  useEffect(()=>{
    if (isError) {
      console.log(message);
    }

    dispatch(getProfile());

  }, [user, isError, dispatch, message, navigate]);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header/>
      {profile.length === 0 ?
       <div className='data_noFound'>Hi, you have no data. Please fill out your 
       <a className='link' href="/profile">Form</a>.</div>
       :
       <div>
        <div className="form_profile"  key={profile._id}>
        <Link to={`/edit/${profile._id}`}><span className='edit_icon'><BiEdit className='edit'/></span></Link>
          <div className='profile_heading'>USER PROFILE 
          <div className='profile_line'></div></div>
           <div>
           <label>NAME</label><br />
           <div className='name'>{profile.name}</div>
           <div className='line_profile'></div>
           <label>FATHER NAME</label><br />
           <div className='name'>{profile.fname}</div>
           <div className='line_profile'></div>
           <label>DATE OF BIRTH</label><br />
           <div className='name'>{profile.dob}</div>
           <div className='line_profile'></div>
           <label>GENDER</label><br />
           <div className='name'>{profile.gender}</div>
           <div className='line_profile'></div>
           <label>PHONE NO.</label><br />
           <div className='name'>{profile.mobile}</div>
           <div className='line_profile'></div>
           <label>ADDRESS</label><br />
           <div className='name'>{profile.address}</div><br />
           <div className='line_profile'></div>
         </div>
        </div>
       
        </div>
}
    </div>
  )
}

export default ViewProfile