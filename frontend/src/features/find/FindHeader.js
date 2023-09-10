import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

const FindHeader = () => {
  return (
    <>
        <div>
            <p className='menu-link mx-2'>
                <Link to="/chats" >Chat</Link>
                <Link to="/find" className='mx-2'>SmartFind</Link>
                <Link to="/report" className='mx-2'>Reports</Link>
            </p>
        </div>
    </>
  )
}

export default FindHeader