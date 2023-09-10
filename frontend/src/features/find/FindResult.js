import React from 'react'
import { Link } from 'react-router-dom'

const FindResult = () => {
    return (
        <>
            <div className="w-2/3 bg-white p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">3 Similar Items Found</h1>
                    
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* First item */}
                    <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
                        <img
                        src="https://th.bing.com/th/id/OIP.KQJkFHRI25GJaGMETz_MFQHaGi?pid=ImgDet&rs=1"
                        alt=""
                        className="w-full rounded-lg mb-2"
                        />
                        <div className=''>
                            <p className="mb-2">
                                <span className="font-bold">Date Found:</span> June 23, 2023
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Founded in:</span> CR eastwing
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Description:</span> color red
                            </p>
                        </div>
                        
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        Claim
                        </button>
                    </div>

                    {/* Second item */}
                    <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
                        <img
                        src="https://th.bing.com/th/id/OIP.KQJkFHRI25GJaGMETz_MFQHaGi?pid=ImgDet&rs=1"
                        alt=""
                        className="w-full rounded-lg mb-2"
                        />
                        <p className="mb-2">
                            <span className="font-bold">Date Found:</span> June 23, 2023
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Founded in:</span> CR eastwing
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Description:</span> color red
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        Claim
                        </button>
                    </div>

                    {/* Third item */}
                    <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
                        <img
                        src="https://th.bing.com/th/id/OIP.KQJkFHRI25GJaGMETz_MFQHaGi?pid=ImgDet&rs=1"
                        alt=""
                        className="w-full rounded-lg mb-2"
                        />
                        <p className="mb-2">
                            <span className="font-bold">Date Found:</span> June 23, 2023
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Founded in:</span> CR eastwing
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Description:</span> color red
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        Claim
                        </button>
                    </div>
                </div>
            </div>
            {/* list of found items and each found items is in a card */}
            
        </>
        
    )
}

export default FindResult
