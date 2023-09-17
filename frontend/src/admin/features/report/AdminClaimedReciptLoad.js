import React, { useEffect, useState } from 'react'
import useAdminAuth from '../../hooks/useAdminAuth';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminClaimedReceipt from './AdminClaimedReceipt';

const AdminClaimedReciptLoad = () => {

    const { userId, name, accessToken } = useAdminAuth()
    const location = useLocation();
    const reports  = location.state // Provide a default value if location.state is null

    const [claimedReport, setClaimedReport] = useState()

    const fetchClaimedReportInfo = async () => {
        try {
            const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`http://localhost:3500/claimedReport/${reports.missingReport}/${reports.foundReport}`, config);
        
        console.log(data)
        setClaimedReport(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchClaimedReportInfo()
        // console.log("I am at admin claimed receipt")
    }, []);

    const content = reports && reports.missingReport && reports.foundReport ? 
        claimedReport ? 
            <AdminClaimedReceipt claimedReport={claimedReport}/> 
            : <p>Loading...</p> 
        :
        <div>
            <p>Data not available. Please navigate through the appropriate route.</p>
        </div> 

    return content
}
export default AdminClaimedReciptLoad