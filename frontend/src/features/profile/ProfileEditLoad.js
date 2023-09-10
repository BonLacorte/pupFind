import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import ProfileEditForm from './ProfileEditForm';
import axios from 'axios';

const ProfileEditLoad = () => {
    const { userId, name, accessToken } = useAuth()

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState()

    const fetchInfo = async () => {
        try {
            const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`http://localhost:3500/user/${userId}`, config);
        console.log(data)
        setProfile(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchInfo()
    }, []);

    const content = profile ? <ProfileEditForm profile={profile}/> : <p>Loading...</p>
    return content
}

export default ProfileEditLoad