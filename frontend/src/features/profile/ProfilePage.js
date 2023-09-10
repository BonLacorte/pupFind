import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'

const ProfilePage = ({profile}) => {
    const { userId, name, accessToken } = useAuth()

    const navigate = useNavigate()

    const [sendLogout, { isLoadingLogout, isSuccessLogout, isErrorLogout, errorLogout }] = useSendLogoutMutation();

    const toggleLogout = () =>  {
        localStorage.removeItem("userInfo");
        sendLogout();
        navigate('/');
    }

    return (
        <>
            <div className="bg-customBackground min-h-screen">
                <div className="mx-auto w-3/5 flex justify-center flex-col pb-10 xs:w-screen">
                    <div className='xs:ml-4'>
                        <h1 className="my-4 text-2xl">
                            Your Profile
                        </h1>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <img src={profile.pic.url} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
                                <div>
                                    <h2 className="text-xl font-semibold">{profile.name}</h2>
                                    <p className="text-gray-600">{profile.email}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold">Additional Information</h3>
                                <div className="mt-3">
                                    <p className="text-gray-700">Phone Number: {profile.phoneNumber || 'N/A'}</p>
                                    <p className="text-gray-700">Membership: {profile.membership || 'N/A'}</p>
                                    <p className="text-gray-700">Specification: {profile.specification || 'N/A'}</p>
                                    <div className="flex mt-3">
                                        {profile.facebookLink && <a href={profile.facebookLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-4">Facebook</a>}
                                        {profile.twitterLink && <a href={profile.twitterLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Twitter</a>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Link to={`/dash/profile/edit/${userId}`}  className="text-blue-500 hover:underline">Edit Profile</Link>
                            </div>
                            <div className="mt-6">
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                                    role="menuitem"
                                    onClick={toggleLogout}
                                    >
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage