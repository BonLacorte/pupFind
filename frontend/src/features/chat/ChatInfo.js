import React, { useEffect, useState } from 'react';
import { Image, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box,     Select, // Import Select component
Input,  // Import Input component
Checkbox, // Import Checkbox component 
} from "@chakra-ui/react";
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from '../../components/FounderModal';
import ChatMateModal from '../../components/ChatMateModal';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import ScrollableFeed from 'react-scrollable-feed';

const ChatInfo = () => {
    const { selectedChat, user } = ChatState();
    const { uid, accessToken } = useAuth();

    const getChatMate = () => {
        if (selectedChat && selectedChat.users) {
            return selectedChat.users.find(u => u._id !== user._id);
        }
        return null;
    };

    const chatMate = getChatMate();

    const [reports, setReports] = useState(null)
    const [missingReports, setMissingReports] = useState(null)
    const [foundReports, setFoundReports] = useState(null)

    // Create a function to fetch all reports of a user
    const getAllReportsByUser = async () => {
        
        let creatorId = uid
        
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    token: `Bearer ${accessToken}`,
                },
            };

            let url = `http://localhost:3500/report/creator/${creatorId}`;
            
            console.log(url)
            const { data } = await axios.get(url, config); // Replace with your API endpoint
            
            // Filter out reports with 'Claimed' status
            // const filteredData = data.filter((report) => report.reportStatus !== 'Claimed');
            
            console.log(`data`,data)
            
            const foundReport = data.filter((report) => report.reportType === 'FoundReport');
            const missingReport = data.filter((report) => report.reportType === 'MissingReport');

            // await setReports(data); // Set the reports in state
            setFoundReports(foundReport)
            setMissingReports(missingReport)
            // console.log(`reports`,reports)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // console.log('Chat Info', selectedChat);
        if (selectedChat) {
            getAllReportsByUser()
        }

        // eslint-disable-next-line
    }, [selectedChat]);

    return (
        <div className="flex flex-col p-3 bg-white w-full md:w-1/3 rounded-lg border border-gray-300">
            {selectedChat ? (
                <>
                    <div className="pb-3 px-3 flex justify-center text-xl font-bold font-work-sans w-full">
                        Chat Information
                    </div>
                    <div className="">
                        {chatMate ? (
                            <div className="p-3 border-b border-gray-300">
                                {/* <h2 className="text-lg font-semibold">Chat Mate:</h2> */}
                                <div className="flex flex-col items-center my-2">
                                    <Image src={chatMate.pic.url} alt={chatMate.name} boxSize="100px" rounded="full" />
                                    <div className="mt-2 flex flex-col items-center ">
                                        <p className="font-semibold">{chatMate.name}</p>
                                        <ChatMateModal user={chatMate}>
                                            <p className="mb-2">
                                                See details
                                            </p>
                                        </ChatMateModal>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">Reports</p>

                                    <p className="font-semibold mb-2">Missing Reports</p>
                                    {missingReports ?
                                        <div className="overflow-y-auto max-h-[250px] mb-4 border-blue-500">
                                            <ScrollableFeed>
                                                <Accordion defaultIndex={[0]} allowMultiple>
                                                    {missingReports.map((report) => (
                                                        <AccordionItem key={report._id}>
                                                            <h2>
                                                                <AccordionButton>
                                                                    <Box flex="1" textAlign="left">
                                                                        {report.itemName}
                                                                    </Box>
                                                                    <AccordionIcon />
                                                                </AccordionButton>
                                                            </h2>
                                                            <AccordionPanel pb={4}>
                                                                
                                                                <p className="font-bold">Date Found:</p>
                                                                <p>{new Date(report.date).toISOString().slice(0, 10)}</p>

                                                                <p className="font-bold">Location Found:</p>
                                                                <p>{report.location}</p>

                                                                <p className="font-bold">Item Description:</p>
                                                                <p>{report.itemDescription}</p>

                                                                <div className="grid grid-cols-2 gap-4 py-2">
                                                                    {report.itemImage ? report.itemImage.map((image) => (
                                                                        <Image
                                                                            key={image._id}
                                                                            src={image.url}
                                                                            alt={`Image of ${report.itemName}`}
                                                                            boxSize="100px"
                                                                        />
                                                                    ))
                                                                    :
                                                                    null }
                                                                </div>

                                                                <p className='w-max'>
                                                                    {report.reportStatus === "Missing" 
                                                                        ? 
                                                                        <div className='px-2 border-2 border-red-500 font-semibold text-red-500 rounded-2xl'>
                                                                            <p>Missing</p>
                                                                        </div>
                                                                        :
                                                                        <div className='px-2 border-2 border-green-500 font-semibold text-green-500 rounded-2xl'>
                                                                            <p>Claimed</p>
                                                                        </div>
                                                                    }
                                                                </p>      

                                                            </AccordionPanel>

                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </ScrollableFeed>
                                        </div>   
                                    : 
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-3xl pb-3 font-work-sans">
                                                No Missing Reports.
                                            </p>
                                        </div>
                                    } 
                                    
                                    <p className="font-semibold mb-2">Found Reports</p>
                                    {foundReports ? 
                                        <div className="overflow-y-auto max-h-[250px] border-blue-500">
                                            <ScrollableFeed>
                                                <Accordion defaultIndex={[0]} allowMultiple>
                                                {foundReports.map((report) => (
                                                    <AccordionItem key={report._id}>
                                                        <h2>
                                                            <AccordionButton>
                                                                <Box flex="1" textAlign="left">
                                                                    {report.itemName}
                                                                </Box>
                                                                <AccordionIcon />
                                                            </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                            
                                                            <p className="font-bold">Date Found:</p>
                                                            <p>{new Date(report.date).toISOString().slice(0, 10)}</p>

                                                            <p className="font-bold">Location Found:</p>
                                                            <p>{report.location}</p>

                                                            <p className="font-bold">Item Description:</p>
                                                            <p>{report.itemDescription}</p>

                                                            <div className="grid grid-cols-2 gap-4 py-2">
                                                                {report.itemImage ? report.itemImage.map((image) => (
                                                                    <Image
                                                                        key={image._id}
                                                                        src={image.url}
                                                                        alt={`Image of ${report.itemName}`}
                                                                        boxSize="100px"
                                                                    />
                                                                ))
                                                                :
                                                                null }
                                                            </div>

                                                            <p className='w-max'>
                                                                {report.reportStatus === "Processing" 
                                                                    ? 
                                                                    <div className='px-2 border-2 border-red-500 font-semibold text-red-500 rounded-2xl'>
                                                                        <p>Processing</p>
                                                                    </div>
                                                                    : report.reportStatus === "Claimable" 
                                                                    ?
                                                                    <div className='px-2 border-2 border-blue-500 font-semibold text-blue-500 rounded-2xl'>
                                                                        <p>Claimable</p>
                                                                    </div>
                                                                    :
                                                                    <div className='px-2 border-2 border-green-500 font-semibold text-green-500 rounded-2xl'>
                                                                        <p>Claimed</p>
                                                                    </div>
                                                                }
                                                            </p>  

                                                        </AccordionPanel>

                                                    </AccordionItem>
                                                ))}
                                                </Accordion>
                                            </ScrollableFeed>
                                        </div>
                                    :
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-3xl pb-3 font-work-sans">
                                                No Found Reports.
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        ) : (
                            <p className="p-3">No chat mate information available.</p>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-3xl pb-3 font-work-sans">
                        No chat selected.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChatInfo;
