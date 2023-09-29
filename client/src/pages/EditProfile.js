import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile} from '../features/profile/profileSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

function EditProfile() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const {user} = useSelector((state)=>state.auth)
  const {isLoading, profile} = useSelector((state)=>state.profile)

  const [updateData, setUpdateData] = useState({
    id : id || '',
    name: profile.name || '', 
    fname : profile.fname || '',
    dob : profile.dob || '',
    gender : profile.gender || '',
    mobile : profile.mobile || '',
    address : profile.address || ''
  })

  const onchange = (e) =>{
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    })
  }

  useEffect(()=>{
    
    if(!user){
      navigate('/login')
    }

    if (profile && profile.length > 0) {
      const profileToUpdate = profile.find((profile) => profile.id === id)
      if (profileToUpdate) {
        setUpdateData({
          ...updateData,
          name : profileToUpdate.name,
          fname : profileToUpdate.fname,
          dob : profileToUpdate.dob,
          gender : profileToUpdate.gender,
          mobile : profile.mobile,
          address : profile.address
        });
      }
    }
  },[user, updateData,  id, profile, navigate])


  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ id: updateData.id, updatedData: updateData }));
    toast.success('Successfully modified')
    navigate("/");
  };

  if(isLoading){
    return <Loading/>
  }

  return (
    <div>
      <Header/>
      <div className="form"><br />
        <div className="header_profile">Edit Form<div className='line'></div></div>
        <form className='profile' onSubmit={onsubmit} >
           <input 
              type="text"
              name='name'
              value={updateData.name}
              onChange={onchange}
              placeholder='Your Name'
              required
           /><hr />
           <input 
              type="text"
              name='fname'
              value={updateData.fname} 
              onChange={onchange}
              placeholder='Your Father Name' 
              required
           /><hr />
           <input 
              type="date" 
              name='dob'
              value={updateData.dob}
              onChange={onchange}
              placeholder='Your Date Of Birth' 
              required
           /><hr />
           <select name="gender" value={updateData.gender}  onChange={onchange} id="" placeholder='Your Gender'>
            <option value="" selected disabled>Gender</option>
            <option value="male">Male</option>
            <option value="Female">Female</option>
            <option value="transgender">Transgender</option>
           </select><hr />
           <input 
              type="text" 
              name='mobile'
              onChange={onchange}
              value={updateData.mobile}
              placeholder='Your Phone No.' 
              required
           /><hr />
           <input 
              type="text" 
              name='address'
              onChange={onchange}
              value={updateData.address}
              placeholder='Your Address' 
              required
            /><hr />
           <button className='profile_btn'>UPDATE</button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile