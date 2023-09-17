import React from 'react'
import { ChatState } from '../../../context/ChatProvider';
import SingleChat from '../../../components/SingleChat';

const AdminChatScreen = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();

    return (
        <div className={`${selectedChat ? 'flex' : 'hidden'} md:flex flex-col p-3 bg-white w-full md:w-3/5 rounded-lg border border-gray-300`}>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
            {/* Single Chat */}
        </div>
    );
}

export default AdminChatScreen