import React, { useEffect, useState } from 'react';
import { Image, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box,     Select, // Import Select component
Input,  // Import Input component
Checkbox, // Import Checkbox component 
} from "@chakra-ui/react";
// import ChatMateModal from '../../components/ChatMateModal';
import axios from 'axios';
import useAdminAuth from '../../hooks/useAdminAuth';
import { ChatState } from '../../../context/ChatProvider';

const AdminChatInfo = () => {
    const { selectedChat, user } = ChatState();
    const { accessToken } = useAdminAuth();

    const getChatMate = () => {
        if (selectedChat && selectedChat.users) {
            return selectedChat.users.find(u => u._id !== user._id);
        }
        return null;
    };

    const chatMate = getChatMate();

    // Add state variables for dropdown values and Meetup Accepted checkboxes
    const [claimingMethod, setClaimingMethod] = useState(chatMate ? 'Meetup' : ''); // Default value based on your logic
    const [meetupPlace, setMeetupPlace] = useState(chatMate ? 'Public Info Area' : ''); // Default value based on your logic
    const [meetupTime, setMeetupTime] = useState(''); // Default empty value for meetup time input
    const [user1Accepted, setUser1Accepted] = useState(false); // Default value based on your logic
    const [user2Accepted, setUser2Accepted] = useState(false); // Default value based on your logic
    
    const finishProcess = async (lostItemId) => {
        try {
            // Send a request to your backend to finish the process
            
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };

            const { data } = await axios.put(`http://localhost:3500/lostItems/${lostItemId}/finishProcess`, 
            {
                chatId: selectedChat._id
            }
            ,config );

            // Handle response or show a message to the user
            console.log(data);
        } catch (error) {
            console.error('Error finishing process:', error);
        }
    };

    const cancelProcess = async (lostItemId) => {
        try {
            // Send a request to your backend to cancel the process
            
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };

            const { data } = await axios.put(`http://localhost:3500/lostItems/${lostItemId}/cancelProcess`, 
            {
                chatId: selectedChat._id
            }
            ,config );


            // Handle response or show a message to the user
            console.log(data);
        } catch (error) {
            console.error('Error cancelling process:', error);
        }
    };

    useEffect(() => {
        console.log('Chat Info', selectedChat);
    }, [selectedChat]);

    const processCancelled = (lostItemProcess) => {
        return lostItemProcess.processHistory.some(history => history.chat === selectedChat._id && history.status === 'cancelled');
    };

    const processClaimed = (lostItemProcess) => {
        return lostItemProcess.processHistory.some(history => history.chat === selectedChat._id && history.status === 'success');
    };

    return (
        <div className="flex flex-col p-3 bg-white w-full md:w-1/5 rounded-lg border border-gray-300">
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
                                        {/* <ChatMateModal user={chatMate}>
                                            <p className="mb-2">
                                                See details
                                            </p>
                                        </ChatMateModal> */}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">Reports</p>

                                    <Accordion defaultIndex={[0]} allowMultiple>
                                    {selectedChat.lostItemProcesses.map((lostItemProcess) => (
                                        <AccordionItem key={lostItemProcess._id}>
                                            <h2>
                                                <AccordionButton>
                                                    <Box flex="1" textAlign="left">
                                                        {lostItemProcess.itemName}
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                {/* ... (previous code) */}
                                                
                                                <p className="font-bold">Date Found:</p>
                                                <p>{new Date(lostItemProcess.dateFound).toISOString().slice(0, 10)}</p>

                                                <p className="font-bold">Location Found:</p>
                                                <p>{lostItemProcess.locationFound}</p>

                                                <p className="font-bold">Item Description:</p>
                                                <p>{lostItemProcess.itemDescription}</p>

                                                <div className="grid grid-cols-2 gap-4 py-2">
                                                    {lostItemProcess.itemImage.map((image) => (
                                                        <Image
                                                            key={image._id}
                                                            src={image.url}
                                                            alt={`Image of ${lostItemProcess.itemName}`}
                                                            boxSize="100px"
                                                        />
                                                    ))}
                                                </div>

                                                <p className="font-bold">Founder:</p>
                                                <p>{lostItemProcess.founderId.name}</p>

                                                {/* <button
                                                    onClick={() => cancelProcess(lostItemProcess._id)}
                                                    className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
                                                >
                                                    Cancel Process
                                                </button>

                                                <button
                                                    onClick={() => finishProcess(lostItemProcess._id)}
                                                    className="px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                                                >
                                                    Claimed
                                                </button> */}

                                                {processCancelled(lostItemProcess) && <p className="mt-2 text-red-600">Process Cancelled</p>}
                                                {processClaimed(lostItemProcess) && <p className="mt-2 text-green-600">Successfully Claimed</p>}

                                                {!processCancelled(lostItemProcess) && !processClaimed(lostItemProcess) && (
                                                    <>
                                                        <button
                                                            onClick={() => cancelProcess(lostItemProcess._id)}
                                                            className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
                                                        >
                                                            Cancel Process
                                                        </button>

                                                        <button
                                                            onClick={() => finishProcess(lostItemProcess._id)}
                                                            className="px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                                                        >
                                                            Claimed
                                                        </button>
                                                    </>
                                                )}
                                            </AccordionPanel>

                                        </AccordionItem>
                                    ))}
                                    </Accordion>
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

export default AdminChatInfo;
