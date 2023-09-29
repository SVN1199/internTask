import React from 'react'
import {BiEdit} from 'react-icons/bi'
import { Link } from 'react-router-dom'

function ProfileForm({profile}) {
  return (
    <div>
         (<div className="form_profile"  key={profile._id}>
        <span className='edit_icon'>
          <Link to={`/edit/${profile._id}`}>
          <BiEdit className='edit'/>
        </Link>
        </span>
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
        </div>)
    </div>
  )
}

export default ProfileForm