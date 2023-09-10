import React, { useState } from 'react'

const AdminReferenceNumberPage = () => {
  const [selectedCategoryReport, setSelectedCategoryReport] = useState('Student');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategoryReport(e.target.value);
  };      

  const content = (
    <>
        <div className='p-20 w-full border-l-amber-600'>
            <div className='pb-4 flex justify-between'>
                <h1 className='text-3xl font-bold text-primaryColor'>Reference Number</h1>

                <div className="flex pb-2">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg mr-2"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                {/* <div>
                    <button className='border bg-red-700' onClick={consoleLogs}>Click Here</button>
                </div> */}
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Reference number</th>
                            <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Claimer</th>
                            <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Founder</th>
                            <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Date Claimed</th>
                            <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Last Modified</th>
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

export default AdminReferenceNumberPage