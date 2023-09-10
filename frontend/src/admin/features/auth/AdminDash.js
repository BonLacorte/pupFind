import { useState } from 'react';
import { Link } from 'react-router-dom'

const AdminDash = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');

    const content = (
        <>
            <div className='p-20 w-full border border-l-amber-600'>
                
                {/* <p>{today}</p> */}
                <div className='pb-4 flex justify-between'>
                    <h1 className='text-3xl font-bold text-primaryColor'>Dashboard</h1>

                    <div className="flex">
                        <input
                            type="date"
                            name="start-date"
                            id="start-date"
                            value={selectedStartDate}
                            onChange={(e) => setSelectedStartDate(e.target.value)}
                            max={selectedStartDate}
                            className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg"
                        />

                        <input
                            type="date"
                            name="end-date"
                            id="end-date"
                            value={selectedEndDate}
                            onChange={(e) => setSelectedEndDate(e.target.value)}
                            max={selectedEndDate}
                            className="bg-gray-100 border-2 w-full px-2 py-1 ml-2 rounded-lg"
                        />
                    </div>
                </div>
                <div className='py-4 flex justify-between'>
                    <div className='border w-1/4 mr-4'>
                        <div className='flex justify-between'>
                            <div>
                                <h1>Missing Reports</h1>
                                <h1>128</h1>
                            </div>
                            <h1>+25</h1>
                        </div>
                    </div>
                    <div className='border w-1/4 mr-4'>
                        <div className='flex justify-between'>
                            <div>
                                <h1>Users</h1>
                                <h1>289</h1>
                            </div>
                            <h1>+12</h1>
                        </div>
                    </div>
                    <div className='border w-1/4 mr-4'>
                        <div className='flex justify-between'>
                            <div>
                                <h1>Claimed Items</h1>
                                <h1>89</h1>
                            </div>
                            <h1>+11</h1>
                        </div>
                    </div>
                    <div className='border w-1/4'>
                        <div className='flex justify-between'>
                            <div>
                                <h1>Unclaimed Items</h1>
                                <h1>39</h1>
                            </div>
                            <h1>0</h1>
                        </div>
                    </div>
                </div>
                <div className='py-4 flex justify-between'>
                    <div className='w-2/5 border mr-4'>
                        <h1>Top Missing Locations</h1>
                    </div>
                    <div className='w-3/5 border'>
                        <h1>Most Reported Missing Items by Program</h1>
                    </div>
                </div>
                <div className='py-4 flex justify-between'>
                    <div className='w-2/5 border mr-4'>
                        <h1>Items</h1>
                    </div>
                    <div className='w-3/5 border'>
                        <h1>Monthly Reported Missing Items</h1>
                    </div>
                </div>
            </div>

        </>
    )

    return content
}
export default AdminDash