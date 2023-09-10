import React, { useState } from 'react'

const AdminReportPage = () => {
    const [selectedCategoryReport, setSelectedCategoryReport] = useState('Claimable');
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryChange = (e) => {
        setSelectedCategoryReport(e.target.value);
    };    

    const content = (
        <>
            <div className='p-20 w-full border-l-amber-600'>
                <div className='pb-4 flex justify-between'>
                    <h1 className='text-3xl font-bold text-primaryColor'>Reports</h1>

                    <div className="flex pb-2">
                        <button className='bg-primaryColor text-white w-full font-bold py-2 px-2 rounded mr-2'>
                            {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                            Add new report
                        </button>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg mr-2"
                        />
                        <select
                            name="category"
                            id="category"
                            value={selectedCategoryReport}
                            onChange={handleCategoryChange}
                            className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg"
                        >
                            <option value="Found">Found Items</option>
                            <option value="Missing">Missing Items</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                    {/* <div>
                        <button className='border bg-red-700' onClick={consoleLogs}>Click Here</button>
                    </div> */}
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Item</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Status</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Date Found</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Ref. Number</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Contact</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Action</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {tableContent}
                        </tbody> */}
                    </table>
                </div>
                
            </div>
        </>
    )

    return content
}

export default AdminReportPage