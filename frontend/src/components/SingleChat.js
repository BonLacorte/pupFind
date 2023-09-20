import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getSender, getSenderAvatar, getSenderFull } from '../features/config/ChatLogic';
import UpdateGroupChatModal from './Miscellaneous/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import animationData from '../animations/typing.json'
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader'
import { io } from 'socket.io-client';
import Lottie from "react-lottie";

const ENDPOINT = "http://localhost:3500"
var socket, selectedChatCompare

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const {accessToken} = useAuth();
    
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState()
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const { selectedChat, setSelectedChat, user, notification, setNotification, chats } = ChatState();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const fetchMessages = async () => {
        // console.log('value of chats in SingleChat - fetchMessages',{chats})
        // console.log('value of selectedChat in SingleChat - fetchMessages',{selectedChat})
        if (!selectedChat) {
            return
        };
    
        try {
        const config = {
            headers: {
            token: `Bearer ${accessToken}`,
            },
        };
    
        setLoading(true);
    
        const { data } = await axios.get(
            `http://localhost:3500/message/${selectedChat._id}`, config);

        
        setMessages(data);
        // console.log({messages})
        setLoading(false);
    
        socket.emit("join chat", selectedChat._id);
        } catch (error) {
            console.log(error)
            console.log('SingleChat fetchMessages-Failed to fetch the Messages')
        }
    }

    const updateLastSeenMessage = async (message) => {
        try {
            // console.log("From ULS User 1")
            // console.log('chatId User 1', selectedChat._id)
            
            // console.log('lastMessageId User 1',messages[messages?.length - 1]?._id)
            
            // console.log('lastMessageId User 1', message)
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };
            const { data } = await axios.post(`http://localhost:3500/chat/update-last-seen-message`,
                {
                    chatId: selectedChat._id,
                    messageId: message._id,
                    messageContent: message.content
                }
            , config);
            // setLastMessage(data);
        } catch (error) {
            console.log(error)
            console.log('SingleChat updateLastSeenMessage-Failed to update last seen message')
        }
    }

    // Function to update User2's last seen message
    const updateUser2LastSeenMessage = async (newMessageReceived) => {
        try {
            // console.log("From ULS User 2")
            // Make an API request to update User2's last seen message
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };
            await axios.post(
                `http://localhost:3500/chat/update-last-seen-message`,
                {
                    chatId: newMessageReceived.chat._id,
                    messageId: newMessageReceived._id,
                    messageContent: newMessageReceived.content
                },
                config
            );
        } catch (error) {
            console.log(error);
            console.log("Failed to update User2's last seen message");
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            // socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        token: `Bearer ${accessToken}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(`http://localhost:3500/message`,
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                config
                );

                await updateLastSeenMessage(data)

                socket.emit("new message", data);
                // console.log("new message", data)
                setMessages([...messages, data]);
                console.log({messages})
                // console.log('SingleChat sendMessage-selectedChat ',{selectedChat})
            } catch (error) {
                console.log(error)
                console.log('SingleChat sendMessage-Failed to send the Message')
            };
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    
        if (!selectedChat) {
            setSelectedChat(chats[0])
            console.log('set chat[0] as selectedChat',{selectedChat})
        };

        return () => {
            socket.disconnect();
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (selectedChat && selectedChatCompare) {
            socket.emit("chat closed", selectedChatCompare);
            console.log('chat closed')
            socket.emit("leave chat", selectedChatCompare);
            console.log('leave chat')
        }

        fetchMessages();

        if (selectedChat && selectedChat.latestMessage) {
            updateLastSeenMessage(selectedChat.latestMessage)
        }

        if (socket) {
            socket.on("message recieved", (newMessageReceived) => {
                if (selectedChat && selectedChat._id === newMessageReceived.chat._id) {
                    console.log(`newMessageReceived`,newMessageReceived)
                    setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
                    updateUser2LastSeenMessage(newMessageReceived);
                }
            });
        }
    
        return () => {
            if (socket) {
                socket.off("message recieved");
            }
        };

        // eslint-disable-next-line
    }, [selectedChat, socket]);

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    
        if (!socketConnected) return;
    
        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
        }
        }, timerLength);
    };


    return (
        <>
            {
                selectedChat 
                ? (
                    <>
                        <div className='flex items-center justify-between pb-3 px-2 w-full'>
                        {/* <div className={`md:${selectedChat ? 'hidden' : 'hidden' }flex items-center justify-between pb-3 px-2 w-full`}> */}
                            <button
                                className='md:hidden'
                                onClick={() => setSelectedChat("")}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            {!selectedChat.isGroupChat ? (
                                <>
                                    <div className='flex flex-row items-center'>
                                        <img src={getSenderAvatar(user, selectedChat.users)} alt="" className="w-10 h-10 rounded-full mr-2"/>
                                        <b>{getSender(user, selectedChat.users)}</b>
                                    </div>
                                    
                                    {/* <ProfileModal user={getSenderFull(user, selectedChat.users)} /> */}
                                </>
                                ) : (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    {/* <UpdateGroupChatModal
                                    fetchMessages={fetchMessages}
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    /> */}
                                </>
                                )}
                        </div>
                        <div className="flex flex-col justify-end p-3  w-full h-full rounded-lg overflow-hidden">
                            {loading ? (
                                <div className="self-center">
                                    {/* <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500"></div> */}
                                    <PulseLoader color={"#000"} />
                                </div>
                            ) : (
                                <div className="flex flex-col overflow-y-auto">
                                    <ScrollableChat messages={messages} />
                                </div>
                            )}

                            <div className="mt-3">
                                {/* {istyping && (
                                    <div>
                                        <Lottie
                                            options={defaultOptions}
                                            // height={50}
                                            width={70}
                                            style={{ marginBottom: 15, marginLeft: 0 }}
                                        />
                                    </div>
                                )} */}

                                <input
                                type="text"
                                className="w-full bg-gray-300 p-2 rounded"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                                onKeyDown={sendMessage}
                                />
                            </div>
                            </div>
                    </>
                ) 
                : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-3xl pb-3 font-work-sans">
                            Click on a user to start chatting
                        </p>
                    </div>
                )
            }
        </>
        
    )
}

export default SingleChat