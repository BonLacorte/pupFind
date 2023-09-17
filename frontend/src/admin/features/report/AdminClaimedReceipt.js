import React, { useEffect, useState } from 'react'
import { Link, useLocation  } from 'react-router-dom'
import useAdminAuth from '../../hooks/useAdminAuth';
import axios from 'axios';
// import successIcon from './../../img/successIcon.png';
import successIcon from './../../../img/successIcon.png'

const AdminClaimedReceipt = ({ claimedReport }) => {
    const { userId, name, accessToken } = useAdminAuth()

    const content =
    <div className="p-20 w-full border-l-amber-600">
        <div className="pb-10 flex justify-between">
            <h1 className="text-3xl font-bold text-primaryColor">Claim Receipt</h1>

            <div className="flex pb-2">
                <button
                    className='bg-primaryColor text-white w-full font-bold py-2 px-2 rounded mr-2'
                >
                    <Link to={`/admin/dash/reports/`}>
                        See Reports Table
                    </Link>
                    
                </button>
            </div>
        </div>
        <div className="flex flex-col justify-center border-2 mx-auto w-2/5 p-6" id="receipt">
            <div className='flex flex-col border-red-600 items-center mb-16'>
                <img src={successIcon} alt="" className='w-20 mb-4'/>
                <h1 className='text-xl'>Item claimed successfully</h1>
                <h1 className='text-sm'>and saved to reference code section</h1>
            </div>
            <div className='border-t py-10'>
                <div className='flex flex-row justify-between mb-2'>
                    <h1>Ref. Code:</h1>
                    <h1 className='font-bold'>{claimedReport._id}</h1>
                </div>
                <div className='flex flex-row justify-between mb-2'>
                    <h1>Item Name:</h1>
                    <h1 className='font-bold'>{claimedReport.foundReportId.itemName}</h1>
                </div>
                <div className='flex flex-row justify-between mb-2'>
                    <h1>Claimed By:</h1>
                    <h1 className='font-bold'>{claimedReport.missingReportId.creatorId.name}</h1>
                </div>
                {/* <div className='flex flex-row justify-between'>
                    <h1>Ref.Number:</h1>
                    <h1>{claimedReport._id}</h1>
                </div> */}
                
            </div>
            <div className='border-dashed border-t-2 py-10'>
                <div className='flex flex-row justify-between mb-2'>
                    <h1>Date Claimed:</h1>
                    <h1 className='font-bold'>{new Date(claimedReport.createdAt).toLocaleDateString()}</h1>
                </div>
            </div>
            <div className=''>
                <button className="w-full border-solid border-primaryColor bg-primaryColor flex flex-col justify-center h-12 shrink-0 items-center border-2 mt-4 font-sans font-medium tracking-[0.5] leading-[16px] text-white">
                    Download
                </button>
            </div>
            
        </div>
    </div>


    return content
}

export default AdminClaimedReceipt