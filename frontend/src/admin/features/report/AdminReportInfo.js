import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';



const AdminReportInfo = () => {

    const location = useLocation();
    const report  = location.state // Provide a default value if location.state is null
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [itemFirstImage, setItemFirstImage] = useState(report.report.itemImage === null ? 'https://www.greenheath.co.uk/wp-content/uploads/2015/09/no_image_available1.png' : report.report.itemImage[0].url)
    const [oldImage, setOldImage] = useState(report.report.itemImage === null ? [] : report.report.itemImage);

    const content = report && report.report ? 
    report ? 
        <>
            <div className="p-20 w-full border-l-amber-600">
                <div className="pb-4 flex justify-between">
                    <h1 className="text-3xl font-bold text-primaryColor">{report.report.reportType === 'FoundReport' ? 'Found Item' : 'Missing Item'}</h1>
            
                    <div className="flex pb-2">
                        <button className="bg-primaryColor text-white w-full font-bold py-2 px-2 rounded mr-2">
                            <Link to={`/admin/dash/reports/`}>
                                See Reports Table
                            </Link>
                        </button>
                    </div>
                </div>

                <div className=" rounded-lg  flex flex-col md:flex-row p-10">
                    <div className="w-1/2 p-4 border-r border-gray-400">
                    

                        <div className='p-4 border-b border-gray-400'>
                            <p className="mb-2">
                            <h1 className="text-2xl font-bold">{report.report.itemName}</h1>
                            </p>
                            <p className="mb-2">
                            <span className="font-bold">Date Found:</span> {new Date(report.report.date).toISOString().slice(0, 10)}
                            </p>
                            <p className="mb-2">
                            <span className="font-bold">Founded in:</span> {report.report.location}
                            </p>
                            <p className="mb-2">
                            <span className="font-bold">Description:</span> {report.report.itemDescription}
                            </p>
                        </div>

                        <div className='p-4'>
                            <div className='flex flex-row justify-between'>
                                <p className="mb-2">
                                    <span className="font-bold">Founder Information:</span>
                                </p>
                            </div>
                            <div className='flex flex-row justify-start'>
                                <img
                                        src={report.report.creatorId.pic.url}
                                        alt=""
                                        className="w-12 rounded-lg mb-2"
                                />
                                <div className='flex flex-col mx-2'>
                                    <p className="mb-2">
                                        <span className="font-bold">{report.report.creatorId.name}</span>
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-bold">{report.report.creatorId.membership}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 p-4 flex justify-center items-center flex-col ">
                        <div className='h-80 w-full flex justify-center border border-gray-400'>
                            {!selectedImage && (
                            <div className='flex h-auto w-auto justify-center'>
                                
                                <img className="w-auto h-auto object-contain" src={ itemFirstImage } alt="" />
                            </div>
                            )}
                            {selectedImage && (
                            <div className='flex h-full w-full justify-center'>
                                
                                <img className="w-auto h-full object-contain" src={selectedImage} alt="Selected Product Preview" />
                            </div>
                            )}
                        </div>
                        
                        <div className='flex justify-center '>
                            <div className="grid grid-cols-5 gap-4 p-4">
                            {oldImage !== null 
                            ?   oldImage.map((image, index) => (
                                <img
                                    className="w-24 h-auto object-contain cursor-pointer"
                                    key={index}
                                    src={image.url}
                                    alt="itemImage"
                                    onClick={() => setSelectedImage(image.url)}
                                />
                                ))
                            : <img
                                className="w-24 h-auto object-contain cursor-pointer"
                                src={oldImage}
                                alt="itemImage"
                            />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <h1>{report.report._id}</h1> */}
        </>
    : <p>Loading...</p> 
    :
    <div>
        <p>Data not available. Please navigate through the appropriate route.</p>
    </div> 

return content
}

export default AdminReportInfo