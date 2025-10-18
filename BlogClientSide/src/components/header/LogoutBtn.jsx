// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlicer'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    // reset auth state in Redux
    dispatch(logout());

    // navigate to login
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className='uppercase rounded-full text-red-500 bg-transparent border-[1.5px] border-red-500 px-4 py-2 transition-colors hover:bg-red-500 hover:text-white'
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
