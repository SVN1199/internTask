import React from 'react'
import {AiOutlineLogout, AiOutlineLogin} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import {BiSolidUser} from 'react-icons/bi'
import { toast } from 'react-toastify';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogOut = () => {
        localStorage.removeItem("user");
        dispatch(logout);
        toast.success('Logged Out')
        navigate("/login");
      };
    

    return (
        <div>
            <div className="header_section">
                <div className="user_icon">
                    <ul className='react_list'>
                        <li><BiSolidUser className='react_user_icon'/></li>
                        <li className='react_name_icon'>
                            {user ? (
                                <a href="/" className='home'>{user.name}</a>
                            ) : (
                                <span>Guest</span>
                            )}
                        </li>
                    </ul>
                </div>
                <div className='react_icon'>
                   {user ? 
                     <AiOutlineLogout onClick={onLogOut} className='icon'/>
                     :
                     <AiOutlineLogin onClick={onLogOut} className='icon'/>
                }
                </div>
            </div>
        </div>
    )
}

export default Header