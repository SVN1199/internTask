import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login'
import Profile from './pages/Profile'
import ViewProfile from './pages/ViewProfile';
import EditProfile from './pages/EditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element= {<Register/>}/>
          <Route path='/login' element= {<Login/>}/>
          <Route path='/profile' element= {<Profile/>}/>
          <Route path='/' element= {<ViewProfile/>}/>
          <Route path='/edit/:id' element= {<EditProfile/>}/>
        </Routes>
      </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
