import React, { useState } from 'react';
import axios from "axios";
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import pic1x1 from './Miscellaneous/samplePics/pic1x1.jpg';
import { ChatState } from '../context/ChatProvider';
import "react-toastify/ReactToastify.min.css";
import NotificationBadge from "react-notification-badge";

import useAuth from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Effect } from "react-notification-badge";
import { getSender } from '../features/config/ChatLogic';

const Header = () => {

    const { userInfo, accessToken, name } = useAuth();

    const [username, setUsername] = useState(name)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false)
    // const [result, setResult] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState("")

    const {
        setSelectedChat,
        // user,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();

    const navigate = useNavigate()

    const [sendLogout, { isLoadingLogout, isSuccessLogout, isErrorLogout, errorLogout }] = useSendLogoutMutation();
        
    const toggleProfile = () => {

        navigate('/dash/profile');
    }

    const toggleLogout = () =>  {
        localStorage.removeItem("userInfo");
        sendLogout();
        navigate('/');
    }

    if (isLoadingLogout) return <p className="text-white">Logging Out...</p>;

    if (isErrorLogout) return <p className="text-white">Error: {errorLogout.data?.message}</p>;

    const toastTypes = ["success", "info", "warning", "error"];

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
        if (isMenuOpen === true) {
            setIsMenuOpen(!isMenuOpen)
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isNotificationOpen === true) {
            setIsNotificationOpen(!isNotificationOpen)
        }
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleSearch = async (e) => {
        if (!search) {
            console.log("Please enter something on search")
            return
        }
    
        try {
            setLoading(true);
    
            const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            },
            };
    
            const { data } = await axios.get(`http://localhost:3500/user?search=${search}`, config);
    
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleAccessChat = async (userId) => {
        try {
            console.log(`handleAccessChat (userId)`,userId)

            setLoadingChat(true);
            const config = {
                headers: {
                "Content-type": "application/json",
                token: `Bearer ${accessToken}`,
                },
            };

            const { data } = await axios.post(`http://localhost:3500/chat`, { userId }, config);
            console.log(`data from accessChat`, data)

            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats])
            }
            

            console.log(`chats in Header`,chats) // 

            setSelectedChat(data)
            console.log(`setSelectedChat`, setSelectedChat)
            setLoadingChat(false)
            toggleDrawer()
        } catch (err) {
            console.log(err)
            // setLoadingChat(false)
            // toast("Error, handleAccesschat", { autoClose: 7000, position: toast.POSITION.BOTTOM_LEFT })
        }
    }

    const consoleLogs = () => {
        // console.log(canAccess)
        // console.log(canAccessContent)
        console.log(userInfo)
    }

    const user = {
        name: 'John Doe',
        avatar: pic1x1,
        email: 'john.doe@example.com',
    };



    return (
        <>
                <header className="bg-secondaryColor flex flex-row">
                    <div className='flex flex-row justify-between mx-auto w-3/5'>
                        <div className="flex justify-center align-center my-2">
                            <Link to="/dash/" className='mx-2 font-semibold text-white'>Home</Link>
                            <Link to="/dash/chats" className='mx-2 font-semibold text-white'>Chat</Link>
                            <Link to="/dash/find" className='mx-2 font-semibold text-white'>SmartFind</Link>
                        </div>
            
                        <div className="flex items-center">
                            <div className="relative inline-block text-left">
                                <button className="mr-2 text-white" onClick={toggleNotification}>
                                    <NotificationBadge
                                        count={notification.length}
                                        effect={Effect.SCALE}
                                    />
                                    <FontAwesomeIcon icon={faBell} />
                                </button>
                                
                                {isNotificationOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none" role="menuitem">
                                                {!notification.length && "No New Messages"}
                                                {notification.map((notif) => (
                                                    <div
                                                    key={notif._id}
                                                    onClick={() => {
                                                        setSelectedChat(notif.chat);
                                                        setNotification(notification.filter((n) => n !== notif));
                                                    }}
                                                    >
                                                    {notif.chat.isGroupChat
                                                        ? `New Message in ${notif.chat.chatName}`
                                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                                    </div>
                                                ))}
                                            </button>
                                            
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative inline-block text-left">
                                <button className="mx-2 text-white" onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faUser} />
                                </button>
                                {isMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            
                                            <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                                            role="menuitem"
                                            >
                                            {username}
                                            </button>
                                        </div>
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            
                                            <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                                            role="menuitem"
                                            onClick={toggleProfile}
                                            >
                                            Profile
                                            </button>
                                        </div>
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            
                                            <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                                            role="menuitem"
                                            onClick={toggleLogout}
                                            >
                                            Logout
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                </header>
            </>
    )
};

export default Header;
