import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import axios from 'axios';
import AdminEditMissingForm from './AdminEditMissingForm';

const AdminEditMissingLoad = () => {
    const { userId, name, accessToken } = useAdminAuth()

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState()

    const fetchReportInfo = async () => {
        try {
            const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`http://localhost:3500/report/${id}`, config);
        
        console.log(`load`)
        console.log(data)
        setReport(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchReportInfo()
    }, []);

    const content = report ? <AdminEditMissingForm report={report}/> : <p>Loading...</p>
    return content
}

export default AdminEditMissingLoad