import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate,  } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

const AdminReportPage = () => {
    const {accessToken, userId, name} = useAdminAuth;
    const navigate = useNavigate()

    const [selectedReportType, setSelectedReportType] = useState('Found');
    const [searchQuery, setSearchQuery] = useState('');
    const [reports, setReports] = useState([]); 
    const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order
    const [sortColumn, setSortColumn] = useState('date'); // Initial sorting column

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [reportToDelete, setReportToDelete] = useState(null);

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

    const handleCategoryChange = (e) => {
        setSelectedReportType(e.target.value);
        getAllReports(e.target.value, searchQuery)
    };    

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Call fetchUsers with updated searchQuery and selected category
        getAllReports(selectedReportType, query);
    };

    const handleDeleteReport = async () => {
        try {
        const config = {
            headers: {
            token: `Bearer ${accessToken}`,
            },
        };
    
        // Send a DELETE request to your API to delete the report
        const { data } = await axios.delete(`http://localhost:3500/report/${reportToDelete._id}`, config);
    
        // Remove the deleted user from the users array
        setReports((prevReports) => prevReports.filter((report) => report._id !== reportToDelete._id));
    
        // Close the delete confirmation modal
        onClose();
        } catch (error) {
        console.log(error);
        }
    };

    // Create a function to fetch all reports
    const getAllReports = async (reportType, query) => {
        let reportTypeUrl = null
        reportType === 'Found' ? reportTypeUrl = 'FoundReport' : reportTypeUrl = 'MissingReport'
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    token: `Bearer ${accessToken}`,
                },
            };

            let url = `http://localhost:3500/report`;

            // Add category and search query as query parameters
            if (reportTypeUrl) {
                url += `?reportType=${reportTypeUrl}`;
            }
            if (query) {
                url += reportTypeUrl ? `&search=${query}` : `?search=${query}`;
            }
            console.log(url)
            const { data } = await axios.get(url, config); // Replace with your API endpoint
            
            // Filter out reports with 'Claimed' status
        const filteredData = data.filter((report) => report.reportStatus !== 'Claimed');
            
            setReports(filteredData); // Set the reports in state
            console.log(reports)
        } catch (error) {
            console.error(error);
        }
    };

      // Use useEffect to fetch all reports when the component mounts
    useEffect(() => {
        getAllReports(selectedReportType);
    }, []);

    // Sorting function for the 'date' column
    const sortByDate = (a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.date) - new Date(b.date);
        } else {
            return new Date(b.date) - new Date(a.date);
        }
    };

    // Sorting function for the 'item name' column
    const sortByName = (a, b) => {
        const nameA = a.itemName.toLowerCase();
        const nameB = b.itemName.toLowerCase();

        if (sortOrder === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    };

    // Sorting function for the 'report status' column
    const sortByStatus = (a, b) => {
        const statusA = a.reportStatus.toLowerCase();
        const statusB = b.reportStatus.toLowerCase();

        if (sortOrder === 'asc') {
            return statusA.localeCompare(statusB);
        } else {
            return statusB.localeCompare(statusA);
        }
    };

    // Use a switch statement to determine which sorting function to apply
    const sortFunction = (column) => {
        switch (column) {
            case 'date':
                return sortByDate;
            case 'item':
                return sortByName;
            case 'status':
                return sortByStatus;
            default:
                return sortByDate; // Default sorting
        }
    };

    // Apply sorting based on the selected column
    const sortedReports = [...reports].sort(sortFunction(sortColumn));
    
    const getTableHeaders = () => {
        return (
            <>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    <button onClick={() => handleSort('item')}>
                        Item {sortColumn === 'item' && sortOrder === 'asc' && <span>▲</span>}
                        {sortColumn === 'item' && sortOrder === 'desc' && <span>▼</span>}
                    </button>
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    <button onClick={() => handleSort('status')}>
                        Status {sortColumn === 'status' && sortOrder === 'asc' && <span>▲</span>}
                        {sortColumn === 'status' && sortOrder === 'desc' && <span>▼</span>}
                    </button>
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    <button onClick={() => handleSort('date')}>
                        {selectedReportType === 'Found' ? 'Date Found' : 'Date Missing'} {sortColumn === 'date' && sortOrder === 'asc' && <span>▲</span>}
                        {sortColumn === 'date' && sortOrder === 'desc' && <span>▼</span>}
                    </button>
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    Ref. Number
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    Report Creator
                </th>
                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">
                    Action
                </th>
            </>
        );
    };

    const getAddButtonLink = () => {
        if (selectedReportType === 'Found') {
          return '/admin/dash/reports/found/new'; // Link for adding a found report
        } else if (selectedReportType === 'Missing') {
          return '/admin/dash/reports/missing/new'; // Link for adding a missing report
        }
    };
        
    const getHeader = () => {
        if (selectedReportType === 'Found') {
            return 'Found Reports';
        } else if (selectedReportType === 'Missing') {
            return 'Missing Reports';
        }
    };

    const consoleLogs = () => {
        console.log(reports)
    }

    return (
        <>
        <div className="p-20 w-full border-l-amber-600">
            <div className="pb-4 flex justify-between">
                <h1 className="text-3xl font-bold text-primaryColor">{getHeader()}</h1>
    
                <div className="flex pb-2">
                    
                    {/* <button className="bg-primaryColor text-white w-full font-bold py-2 px-2 rounded mr-2" onClick={consoleLogs}>
                        
                            Testing
                        
                    </button> */}

                    <button className="bg-primaryColor text-white w-full font-bold py-2 px-2 rounded mr-2">
                        <Link to={getAddButtonLink()}>
                            {`Add ${selectedReportType} Report`}
                        </Link>
                    </button>
                    
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg mr-2"
                    />
                    <select
                        name="category"
                        id="category"
                        value={selectedReportType}
                        onChange={handleCategoryChange}
                        className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg"
                    >
                    <option value="Found">Found Items</option>
                    <option value="Missing">Missing Items</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <table className="w-full border">
                    <thead>
                        <tr>{getTableHeaders()}</tr> {/* Render table headers based on the selected option */}
                    </thead>
                        {/* Render table rows based on the selected option */}
                    <tbody>
                        {/* Map and render filteredReports here */}
                        {sortedReports.map((report) => (
                            <tr key={report._id}>
                                {/* Render report data here */}
                                <td className="px-6 py-3">
                                    <div className='flex flex-row items-center '>
                                        {!report.itemImage ? <img src={'https://www.greenheath.co.uk/wp-content/uploads/2015/09/no_image_available1.png'} alt="" className="w-10 h-10 rounded-full mr-2"/> : <img src={report.itemImage[0].url} alt="" className="w-10 h-10 rounded-full mr-2"/>}
                                        {report.itemName}        
                                    </div>
                                </td>
                                <td className="px-6 py-3">{report.reportStatus}</td>
                                <td className="px-6 py-3">{new Date(report.date).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{report._id}</td>
                                <td className="px-6 py-3">
                                        <div className='flex flex-row items-center '>
                                            {<img src={report.creatorId.pic.url} alt="" className="w-10 h-10 rounded-full mr-2"/> || '-'}
                                            {report.creatorId.name || '-'}
                                        </div>
                                    </td>
                                <td className="px-6 py-3">
                                    <Link to={selectedReportType === 'Found' ? `/admin/dash/reports/found/edit/${report._id}` : `/admin/dash/reports/missing/edit/${report._id}`} className="bg-white text-blue-500 font-bold py-2 px-2 rounded mr-2">
                                        Edit
                                    </Link>
                                    
                                    <button 
                                        onClick={() => {
                                            navigate(selectedReportType === 'Found' ? `/admin/dash/reports/found/info` : `/admin/dash/reports/missing/info`, {state: { report: report}})
                                    }} className="bg-white text-blue-500 font-bold py-2 px-2 rounded mr-2">
                                        Info
                                    </button>
                                    {/* <Link 
                                        to={{ 
                                            pathname: selectedReportType === 'Found' ? `/admin/dash/reports/found/info` : `/admin/dash/reports/missing/info`, 
                                            state: { report: report},
                                            }}
                                    >
                                        Info
                                    </Link> */}
                                    {selectedReportType === 'Found' ? 
                                        <Link to={`/admin/dash/reports/found/${report._id}`} className="bg-white text-blue-500 font-bold py-2 px-2 rounded mr-2">
                                            Claim
                                        </Link> : null
                                    }
                                    <button
                                        onClick={() => {
                                            setReportToDelete(report);
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
                <ModalHeader>Delete User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {reportToDelete && (
                    <p>Are you sure you want to delete User {reportToDelete.name}?</p>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={handleDeleteReport}>Delete</Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}

export default AdminReportPage