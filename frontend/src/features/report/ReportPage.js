import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { ChatState } from '../../context/ChatProvider';

const ReportPage = () => {
    const { accessToken, userId } = useAuth();
    const { setSelectedReport } = ChatState();
    const currentDate = new Date().toISOString().split('T')[0];

    const [lostItems, setLostItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [searchedLostItems, setSearchedLostItems] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Claimable');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10; // Number of items per page

    useEffect(() => {
        fetchLostItems();
    }, [searchedLostItems, selectedCategory, selectedDate, currentPage]);

    const fetchLostItems = async () => {
        try {
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };

            const { data } = await axios.get(
                `http://localhost:3500/lostitems?search=${searchedLostItems}&reportStatus=${selectedCategory}&dateFound=${selectedDate}&page=${currentPage}`,
                config
            );

            
            // console.log(data)
            // console.log(data.items)

            

        setLostItems(data); // Set lostItems directly to the response data
        setTotalPages(data.length > 0 ? Math.ceil(data[0].totalItems / itemsPerPage) : 1); // Assuming you have a 'totalItems' field in your response

        } catch (error) {
            console.log(error);
        }
    };

    const searchLostItems = () => {
        setSearchedLostItems(searchQuery);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset to the first page when changing category
    };

    const isCreatedByCurrentUser = (founderId) => {
        return founderId === userId;
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="bg-customBackground min-h-screen">
                <div className="mx-auto w-3/5 flex justify-center flex-col pb-10 xs:w-screen">
                    <div className="xs:ml-4">
                        <h1 className="my-4 text-2xl">Home</h1>
                    </div>
                    <div className="bg-white p-4">
                        <div className="mb-4">
                            <div className="flex justify-center">
                                <div className="flex flex-row">
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="Search by item name or description"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg"
                                    />
                                    <button
                                        onClick={searchLostItems}
                                        className="bg-blue-500 text-white px-2 py-0 rounded font-semibold"
                                    >
                                        Go
                                    </button>
                                </div>
                                <div className="flex flex-col mx-4">
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        max={currentDate}
                                        className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg"
                                    />
                                </div>
                                <div className="flex flex-col mx-4">
                                    <select
                                        name="category"
                                        id="category"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg"
                                    >
                                        <option value="Claimable">Claimable</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Claimed">Claimed</option>
                                    </select>
                                </div>
                                <div>
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded font-semibold">
                                        <Link to="/dash/report/new">Add a new Report</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
                                {lostItems && lostItems.map((lostItem) => (
                                    <div key={lostItem._id} className="flex flex-col justify-between bg-white  px-4 py-6 mx-2 mb-4 rounded-lg shadow-md ">
                                        <div className="flex justify-center align-center mb-2 h-2/3 w-full ">
                                            <img
                                                src={lostItem.itemImage.length > 0 ? lostItem.itemImage[0].url : 'https://www.greenheath.co.uk/wp-content/uploads/2015/09/no_image_available1.png'}
                                                alt={lostItem.itemName}
                                                className="w-auto h-60 object-contain rounded-lg mb-2"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="mb-2">
                                                <span className="font-bold">{lostItem.itemName}</span>
                                            </p>
                                            <p className="mb-2">
                                                <span className="font-bold">Date Found:</span>{' '}
                                                {new Date(lostItem.dateFound).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className='flex justify-center'>
                                            {userId === lostItem.founderId._id && lostItem.reportStatus === 'Claimable' && (
                                                <Link
                                                    to={`/dash/report/edit/${lostItem._id}`}
                                                    onClick={() => setSelectedReport(lostItem)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Edit
                                                </Link>
                                            )}
                                            {userId !== lostItem.founderId._id && lostItem.reportStatus === 'Claimable' && (
                                                <Link
                                                    to={`/dash/report/${lostItem._id}`}
                                                    onClick={() => setSelectedReport(lostItem)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Claim
                                                </Link>
                                            )}
                                            {userId === lostItem.founderId._id && lostItem.reportStatus === 'Processing' && (
                                                <Link
                                                    to={`/dash/report/edit/${lostItem._id}`}
                                                    onClick={() => setSelectedReport(lostItem)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Edit
                                                </Link>
                                            )}
                                            {userId !== lostItem.founderId._id && lostItem.reportStatus === 'Processing' && (
                                                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" disabled>
                                                    Processing
                                                </button>
                                            )}
                                            {lostItem.reportStatus === 'Claimed' && (
                                                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" disabled>
                                                    Claimed
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Pagination controls */}
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`px-4 py-2 mx-2 ${
                                        currentPage === i + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                    } rounded`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportPage;
