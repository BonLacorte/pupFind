import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice';

const ReportHeader = () => {

  const navigate = useNavigate()

  const [sendLogout, { isLoadingLogout, isSuccessLogout, isErrorLogout, errorLogout }] = useSendLogoutMutation();

  const toggleLogout = () =>  {
      localStorage.removeItem("userInfo");
      sendLogout();
      navigate('/');
  }

  if (isLoadingLogout) return <p className="text-white">Logging Out...</p>;

  if (isErrorLogout) return <p className="text-white">Error: {errorLogout.data?.message}</p>;

  return (
    <>
        <div className='flex justify-between'>
            <p className='menu-link mx-2'>
                <Link to="dash/" className='mx-2'>Home</Link>
                <Link to="dash/chats" >Chat</Link>
                <Link to="dash/find" className='mx-2'>SmartFind</Link>
            </p>
            <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            role="menuitem"
            onClick={toggleLogout}
            >
            Logout
            </button>
        </div>
    </>
  )
}

export default ReportHeader