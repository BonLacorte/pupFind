import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import UserBadgeItem from '../UserBadgeItem';
import UserListItem from '../UserListItem'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const GroupChatModal = ({ children }) => {

    const { userInfo, accessToken } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            console.log('GroupChatModal: User already added')
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }
    
        try {
            setLoading(true);

            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };

            const { data } = await axios.get(`http://localhost:3500/user?search=${search}`, config);
            // console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            console.log(`GroupChatModal: handleSearch-Error Occured!`)
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };
    
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            console.log(`GroupChalModal: handleSubmit-Please fill all the fields`)
        return;
        }
    
        try {
        const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        };
        const { data } = await axios.post(`http://localhost:3500/chat/group`,
            {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
            },
            config
        );
            setChats([data, ...chats]);
            toggleModal();
            console.log(`GroupChalModal: handleSubmit-New Group Chat Created!`)
        
        } catch (error) {
            console.log(error)
            console.log(`GroupChalModal: handleSubmit-Failed to Create the Chat!`)
        }
    };
    

    function ModalHeader() {
        return (
            <h2 className="text-4xl font-bold text-center mb-4">Create Group Chat</h2>
        );
    }
    
    // function ModalBody() {
    //     return (
            
    //     );
    // }

    function ModalFooter() {
        return (
            <div className="flex justify-center p-4">
                <button
                    onClick={toggleModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                    Close
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleSubmit}
                >
                Create Chat
                </button>
            </div>
        );
    }

    return (
        <>
        <span onClick={() => setIsModalOpen(true)}>{children}</span>
    
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* <div className="fixed inset-0 bg-gray-900 bg-opacity-75" /> */}
                
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                    <div className="p-6">
                        <ModalHeader />
                        <div className="flex flex-col items-center">
                            <input
                                // type="text"
                                placeholder="Chat Name"
                                className="px-4 py-2 border border-gray-300 rounded mb-3 w-full"
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <input
                                // type="text"
                                placeholder="Add Users eg: John, Piyush, Jane"
                                className="px-4 py-2 border border-gray-300 rounded mb-1 w-full"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <div className="w-full flex flex-wrap">
                                {selectedUsers.map((u) => (
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleDelete(u)}
                                    />
                                ))}
                            </div>
                            {loading ? (
                            <div>Loading...</div>
                            ) : (
                                searchResult?.slice(0, 4).map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <ModalFooter/>
                </div>
            </div>
        )}
        </>
    );
}

export default GroupChatModal