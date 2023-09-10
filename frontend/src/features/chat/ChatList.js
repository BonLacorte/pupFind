import React, { useEffect, useState } from 'react'
import ChatLoading from '../../components/ChatLoading'
import { ChatState } from '../../context/ChatProvider';
import { getSender } from '../config/ChatLogic';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const ChatList = ({ fetchAgain }) => {

    const { accessToken } = useAuth();

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
        console.log(`data in ChatList`, data)
        await setChats(data);
        console.log(`chats in ChatList`,{chats})
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
                    <div className="pb-3 px-3 flex justify-center text-xl font-bold font-work-sans w-full">
                        My Chats
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

export default ChatList

// Compare this snippet from frontend\src\features\chat\ChatScreen.js:
