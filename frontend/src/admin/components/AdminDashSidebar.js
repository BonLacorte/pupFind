import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFolder, faHashtag, faHome, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import home from './../../img/home.png';
import folders from './../../img/folders.png';
import users from './../../img/users.png';
import hash from './../../img/hash.png';
import envelope from './../../img/Envelope.png';
import user from './../../img/User Thumb.png';
import gear from './../../img/button.png';
import notification from './../../img/button-1.png';
import logo from './../../img/Redpupfind 4.png';

const AdminDashSidebar = () => {
    // Define the list of webpages for the sidebar
    const webpages = [
        { name: 'Home', path: '', icon: home },
        { name: 'Reports', path: 'reports', icon: folders },
        { name: 'Messages', path: 'messages', icon: envelope },
        { name: 'Users', path: 'users', icon: users },
        { name: 'Reference Numbers', path: 'referenceNumber', icon: hash },
    ];

    const location = useLocation();

    return (
        <div className="w-1/6 h-full p-4 border-r flex flex-col items-center">
            {/* <h2 className="text-xl font-bold mb-4 w-full flex flex-row">Admin Dashboard</h2> */}
            <img src={logo} alt=""/>
            <div className='flex flex-row'>
                <Link to="/" className="flex flex-row items-center mb-4">
                    <img src={user} alt="" />
                </Link>
                <Link to="/" className="flex flex-row items-center mb-4">
                    <img src={gear} alt="" />
                </Link>
                <Link to="/
                " className="flex flex-row items-center mb-4">
                    <img src={notification} alt="" />
                </Link>
            </div>
            <ul className=' border-yellow-500 w-full'>
                {webpages.map((page, index) => (
                    
                        <Link
                            to={`/admin/dash/${page.path}`}
                            className={`${location.pathname === `/admin/dash/${page.path}` ? 'font-bold bg-yellow-100 w-full' : ''} flex flex-row`}
                        >
                            <li key={index} className="pl-4 mb-1 h-14 w-full flex items-center border-purple-500 hover:bg-yellow-100">
                                {/* <FontAwesomeIcon icon={page.icon} /> */}
                                <img src={page.icon} alt="" />
                                <label className='ml-2'>{page.name}</label>
                            
                            
                            </li>
                        </Link>
                    
                ))}
            </ul>
        </div>
    );
};

export default AdminDashSidebar;
