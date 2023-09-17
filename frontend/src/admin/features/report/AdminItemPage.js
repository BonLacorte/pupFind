import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAdminAuth from '../../hooks/useAdminAuth';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';

const AdminItemPage = ({ report }) => {

    const {accessToken, userId, name} = useAdminAuth;

    const [selectedImage, setSelectedImage] = useState(null);
    const [itemFirstImage, setItemFirstImage] = useState(report.itemImage === null ? 'https://www.greenheath.co.uk/wp-content/uploads/2015/09/no_image_available1.png' : report.itemImage[0].url)
    const [oldImage, setOldImage] = useState(report.itemImage === null ? [] : report.itemImage);
    const navigate = useNavigate()

    const [selectedReportType, setSelectedReportType] = useState('Missing');
    const [searchQuery, setSearchQuery] = useState('');
    const [reports, setReports] = useState([]); 
    const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order
    const [sortColumn, setSortColumn] = useState('date'); // Initial sorting column

    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // Function to open the modal and set the selected report
    const openModal = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReport(null);
    };

    // Function to handle the claim action
    const handleClaim = async () => {
        if (selectedReport) {
        // Implement your claim logic here
        console.log('Claim clicked');
        console.log('Missing Report:', selectedReport);
        console.log('Found Report:', report);

        // console.log(name)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    token: `Bearer ${accessToken}`,
                },
            };
            
            const { data } = await axios.post(`http://localhost:3500/claimedReport/`,
                {
                    foundReportId: report._id, 
                    missingReportId: selectedReport._id, 
                },
            config
            );

            console.log(`New Claimed report - data `,data)

            navigate(`/admin/dash/reports/claimed/`, {state: { foundReport: report._id, missingReport: selectedReport._id }})
        } catch (error) {
            console.log(error)
            console.log('New Claimed report')
        };

        // Close the modal
        closeModal();
        }
    };
    
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Call fetchUsers with updated searchQuery and selected category
        getAllReports(selectedReportType, query);
    };


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
            </>
        );
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
            setReports(data); // Set the reports in state
            console.log(reports)
        } catch (error) {
            console.error(error);
        }
    };
    
    // Use useEffect to fetch all reports when the component mounts
    useEffect(() => {
        getAllReports(selectedReportType);
    }, []);

    return (
        <>
            <div className="p-20 w-full border-l-amber-600">
                <div className="pb-4 flex justify-between">
                    <h1 className="text-3xl font-bold text-primaryColor">Found Item</h1>
            
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
                    {/* Lost Item info */}

                        <div className='p-4 border-b border-gray-400'>
                            <p className="mb-2">
                            <h1 className="text-2xl font-bold">{report.itemName}</h1>
                            </p>
                            <p className="mb-2">
                            <span className="font-bold">Date Found:</span> {new Date(report.date).toISOString().slice(0, 10)}
                            </p>
                            <p className="mb-2">
                            <span className="font-bold">Founded in:</span> {report.location}
                            </p>
                            <p className="mb-2">
                            <span className="font-bold">Description:</span> {report.itemDescription}
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
                                        src={report.creatorId.pic.url}
                                        alt=""
                                        className="w-12 rounded-lg mb-2"
                                />
                                <div className='flex flex-col mx-2'>
                                    <p className="mb-2">
                                        <span className="font-bold">{report.creatorId.name}</span>
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-bold">{report.creatorId.membership}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 p-4 flex justify-center items-center flex-col ">
                        <div className='h-80 w-full flex justify-center border border-gray-400'>
                            {!selectedImage && (
                            <div className='flex h-auto w-auto justify-center'>
                                {/* <h2>Selected Image:</h2> */}
                                <img className="w-auto h-auto object-contain" src={ itemFirstImage } alt="" />
                            </div>
                            )}
                            {selectedImage && (
                            <div className='flex h-full w-full justify-center'>
                                {/* <h2>Selected Image:</h2> */}
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

                <div className="pb-4 flex justify-between">
                    <h1 className="text-3xl font-bold text-primaryColor">Missing Reports</h1>
        
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
                    <table className="w-full border">
                        <thead>
                            <tr>{getTableHeaders()}</tr> {/* Render table headers based on the selected option */}
                        </thead>
                            {/* Render table rows based on the selected option */}
                        <tbody>
                            {/* Map and render filteredReports here */}
                            {sortedReports.map((report) => (
                                <tr key={report._id} onClick={() => openModal(report)}>
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
                                            <img src={report.creatorId.pic.url} alt="" className="w-10 h-10 rounded-full mr-2"/>
                                            {report.creatorId.name || '-'}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal for confirmation */}
            <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Claim Item
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want that user{' '}
                        <Text as='b'>{selectedReport?.creatorId.name}</Text> who has a missing{' '}
                        <Text as='b'>{selectedReport?.itemName}</Text> report wants to claim the found{' '}
                        <Text as='b'>{report?.itemName}</Text> report of user <Text as='b'>{report?.creatorId.name}</Text>?
                    </ModalBody>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={handleClaim}>
                            Claim
                        </Button>
                        <Button variant="ghost" onClick={closeModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>      
        </>
    )
}

export default AdminItemPage