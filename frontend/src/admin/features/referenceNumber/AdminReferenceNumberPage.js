import React, { useEffect, useState } from 'react'
import useAdminAuth from '../../hooks/useAdminAuth';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

const AdminReferenceNumberPage = () => {
    const {accessToken, userId, name} = useAdminAuth;
    const navigate = useNavigate()

    const [selectedCategoryReport, setSelectedCategoryReport] = useState('Student');
    const [searchQuery, setSearchQuery] = useState('');
    const [claimedReports, setClaimedReports] = useState([])
    const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order
    const [sortColumn, setSortColumn] = useState('dateClaimed');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [claimedReportToDelete, setClaimedReportToDelete] = useState(null);
    const [claimedReportToDownload, setClaimedReportToDownload] = useState(null);

    const handleSort = (column) => {
        // Toggle sorting order if the same column is clicked again
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set the new sorting column and default to ascending order
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Call fetchUsers with updated searchQuery and selected category
        getAllClaimedReports(query);
    };

    const handleDeleteClaimedReport = async () => {
        try {
        const config = {
            headers: {
            token: `Bearer ${accessToken}`,
            },
        };
    
        // Send a DELETE request to your API to delete the report
        const { data } = await axios.delete(`http://localhost:3500/claimedReport/${claimedReportToDelete._id}`, config);
    
        // Remove the deleted user from the users array
        setClaimedReports((prevClaimedReports) => prevClaimedReports.filter((claimedReport) => claimedReport._id !== claimedReportToDelete._id));
    
        // Close the delete confirmation modal
        onClose();
        } catch (error) {
        console.log(error);
        }
    };

    // Create a function to fetch all reports
    const getAllClaimedReports = async (query) => {
        
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    token: `Bearer ${accessToken}`,
                },
            };

            let url = `http://localhost:3500/claimedReport`;

            // Add search query as query parameters

            if (query) {
                url +=  `?search=${query}`;
            }
            console.log(url)
            const { data } = await axios.get(url, config); // Replace with your API endpoint

            setClaimedReports(data); // Set the reports in state
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };

    // Use useEffect to fetch all reports when the component mounts
    useEffect(() => {
        getAllClaimedReports();
    }, []);

    // Sorting function for the 'dateClaimed' column
    const sortByDateClaimed = (a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    };

    // Sorting function for the 'dateFound' column
    const sortByDateFound = (a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.foundReportId.date) - new Date(b.foundReportId.date);
        } else {
            return new Date(b.foundReportId.date) - new Date(a.foundReportId.date);
        }
    };

    // Sorting function for the 'dateMissing' column
    const sortByDateMissing = (a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.missingReportId.date) - new Date(b.missingReportId.date);
        } else {
            return new Date(b.missingReportId.date) - new Date(a.missingReportId.date);
        }
    };

    // Sorting function for the 'item name' column
    const sortByItemName = (a, b) => {
        const nameA = a.foundReportId.itemName.toLowerCase();
        const nameB = b.foundReportId.itemName.toLowerCase();

        if (sortOrder === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    };

    // Use a switch statement to determine which sorting function to apply
    const sortFunction = (column) => {
        switch (column) {
            case 'dateClaimed':
                return sortByDateClaimed;
            case 'dateFound':
                return sortByDateFound;
            case 'dateMissing':
                return sortByDateMissing;
            case 'itemName':
                return sortByItemName;
            default:
                return sortByDateClaimed; // Default sorting
        }
    };

    // // Apply sorting based on the selected column
    const sortedClaimedReports = [...claimedReports].sort(sortFunction(sortColumn));

    const getTableHeaders = () => {
        return (
            <>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    <button onClick={() => handleSort('itemName')}>
                    {/* <button> */}
                        Item {sortColumn === 'itemName' && sortOrder === 'asc' && <span>▲</span>}
                        {sortColumn === 'itemName' && sortOrder === 'desc' && <span>▼</span>}
                    </button>
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    Ref Number
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                        Claimer 
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    <button onClick={() => handleSort('dateMissing')}>
                    {/* <button> */}
                        Date Missing {sortColumn === 'dateMissing' && sortOrder === 'asc' && <span>▲</span>}
                        {sortColumn === 'dateMissing' && sortOrder === 'desc' && <span>▼</span>}
                    </button>
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                        Founder
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    <button onClick={() => handleSort('dateFound')}>
                    {/* <button> */}
                        Date Found {sortColumn === 'dateFound' && sortOrder === 'asc' && <span>▲</span>}
                        {sortColumn === 'dateFound' && sortOrder === 'desc' && <span>▼</span>}
                    </button>
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    <button onClick={() => handleSort('dateClaimed')}>
                    {/* <button> */}
                        Date Claimed {sortColumn === 'dateClaimed' && sortOrder === 'asc' && <span>▲</span>}
                        {sortColumn === 'dateClaimed' && sortOrder === 'desc' && <span>▼</span>}
                    </button>
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    Action
                </th>
            </>
        );
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
                            onChange={handleSearchChange}
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
                            <tr>{getTableHeaders()}</tr>
                        </thead>
                        <tbody>
                            {/* {tableContent} */}
                            {/* {!claimedReports ? null : claimedReports.map((claimedReport) => ( */}
                            {sortedClaimedReports.map((claimedReport) => (
                                <tr key={claimedReport._id} onClick={() => {
                                    navigate(`/admin/dash/referenceNumber/info/`, 
                                    {state: { claimedReport: claimedReport}}) 
                                }}>
                                    {/* Render report data here */}
                                    <td className="px-6 py-3">
                                        <div className='flex flex-row items-center '>
                                            <img src={claimedReport.foundReportId.itemImage ? claimedReport.foundReportId.itemImage[0].url : 'https://www.greenheath.co.uk/wp-content/uploads/2015/09/no_image_available1.png'} alt="" className="w-10 h-10 rounded-full mr-2"/>
                                            {claimedReport.foundReportId.itemName}        
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">{claimedReport._id}</td>
                                    <td className="px-6 py-3">
                                        <div className='flex flex-row items-center '>
                                            <img src={claimedReport.missingReportId.creatorId.pic.url} alt="" className="w-10 h-10 rounded-full mr-2"/>
                                            {claimedReport.missingReportId.creatorId.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">{new Date(claimedReport.missingReportId.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">
                                        <div className='flex flex-row items-center '>
                                            <img src={claimedReport.foundReportId.creatorId.pic.url} alt="" className="w-10 h-10 rounded-full mr-2"/>
                                            {claimedReport.foundReportId.creatorId.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">{new Date(claimedReport.foundReportId.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">{new Date(claimedReport.createdAt).toLocaleDateString()}</td>
                                    
                                    <td className="px-6 py-3">

                                        <button onClick={() => {
                                            setClaimedReportToDownload(claimedReport);
                                            // console.log(claimedReportToDownload)
                                            // console.log(`claimedReport`, claimedReport)
                                            navigate(`/admin/dash/referenceNumber/download/`, {state: { claimedReport: claimedReport}})
                                        }} className='className="bg-white text-green-500 font-bold py-2 px-2 rounded mr-2"'>
                                                Download
                                        </button>
                                        
                                        <button
                                            onClick={() => {
                                                navigate(`/admin/dash/referenceNumber/info/`, {state: { claimedReport: claimedReport}}) 
                                            }} className="bg-white text-blue-500 font-bold py-2 px-2 rounded mr-2">
                                            Info
                                        </button>
                                        
                                        <button
                                            onClick={() => {
                                                setClaimedReportToDelete(claimedReport);
                                                onOpen(); // Open the delete confirmation modal
                                            }}
                                            className="bg-white text-red-500 font-bold py-2 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
            {/* Delete Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Claimed Report</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {claimedReportToDelete && (
                        <p>Are you sure you want to delete this Claimed Report code {claimedReportToDelete._id}?</p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={handleDeleteClaimedReport}>Delete</Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

    return content
}

export default AdminReferenceNumberPage