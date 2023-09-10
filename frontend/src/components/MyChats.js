import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import { useGetChatQuery } from '../features/chat/chatApiSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import ChatLoading from './ChatLoading';
import { getSender } from '../features/config/ChatLogic';
import GroupChatModal from './Miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain }) => {

    const { userInfo, accessToken } = useAuth();

    const [loggedUser, setLoggedUser] = useState();

    const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();

    const fetchChats = async () => {
        try {
            const config = {
            headers: {
                token: `Bearer ${accessToken}`,
                },
            };

        const { data } = await axios.get(`http://localhost:3500/chat`, config);
        console.log(`data in MyChats`, data)
        setChats(data);
        console.log(`chats in MyChats`,chats)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
        fetchChats()
    }, [fetchAgain])

    return (
        <>
            <div className={`${selectedChat ? 'hidden' : 'flex'} md:${selectedChat ? 'flex' : 'flex'} flex-col items-center p-3 bg-white w-full md:w-1/3 rounded-lg border border-gray-300`}>
                <div >
                    <div className="pb-3 px-3 flex justify-between items-center text-xl font-bold font-work-sans w-full">
                        My Chats
                        <GroupChatModal>
                            <button id="add-groupchat-button " className="flex items-center font-medium text-base">
                                New Group Chat
                            </button>
                        </GroupChatModal>
                    </div>
                </div>
                <div className="flex flex-col p-3 bg-gray-200 w-full h-full rounded-lg overflow-hidden">
                {chats ? (
                    <div className="overflow-y-scroll scrollbar-none">
                    {chats.map((chat) => (
                        <div
                        key={chat._id}
                        onClick={() => setSelectedChat(chat)}
                        className={`cursor-pointer p-3 mb-2 rounded-lg ${
                            selectedChat === chat ? 'bg-teal-500 text-white' : 'bg-gray-300'
                        }`}
                        >
                        <div className="font-bold">
                            {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                        </div>
                        {chat.latestMessage && (
                            <div className="text-xs">
                            <b>{chat.latestMessage.sender.name} : </b>
                            {chat.latestMessage.content.length > 50
                                ? chat.latestMessage.content.substring(0, 51) + '...'
                                : chat.latestMessage.content}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                ) : (
                    <ChatLoading />
                )}
                </div>
            </div>
        </>
    )
}

export default MyChats