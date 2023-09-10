import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import UserBadgeItem from '../UserBadgeItem';
import UserListItem from '../UserListItem';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import { ViewIcon } from "@chakra-ui/icons";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {

    const { userInfo, accessToken } = useAuth();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

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
        console.log(data);
        setLoading(false);
        setSearchResult(data);
    } catch (error) {
        console.log(`UpdateGroupChatModal: handleSearch-Error Occured!`)
    }
    };

    const handleRename = async () => {
    if (!groupChatName) return;

    try {
        setRenameLoading(true);
        const config = {
        headers: {
            token: `Bearer ${accessToken}`,
        },
        };
        const { data } = await axios.put(
            `http://localhost:3500/chat/rename`,
        {
            chatId: selectedChat._id,
            chatName: groupChatName,
        },
        config
        );

        console.log(data._id);
        // setSelectedChat("");
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
    } catch (error) {
        console.log(`UpdateGroupChatModal: handleRename-Error Occured!`)
    }
    setGroupChatName("");
    };

    const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
        console.log(`UpdateGroupChatModal: handleRename-User Already in group!`)
        return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
        console.log(`UpdateGroupChatModal: handleAddUser-Only admins can add someone!`)

        return;
    }

    try {
        setLoading(true);
        const config = {
        headers: {
            token: `Bearer ${accessToken}`,
        },
        };
        const { data } = await axios.put(
            `http://localhost:3500/chat/groupadd`,
        {
            chatId: selectedChat._id,
            userId: user1._id,
        },
        config
        );

        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
    } catch (error) {
        console.log(`UpdateGroupChatModal: handleAddUser-Error Occured!`)
        
        setLoading(false);
    }
    setGroupChatName("");
    };

    const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
        console.log(`UpdateGroupChatModal: handleRemove-Only admins can remove someone!`)
        return;
    }

    try {
        setLoading(true);
        const config = {
        headers: {
            token: `Bearer ${accessToken}`,
        },
        };
        const { data } = await axios.put(
            `http://localhost:3500/chat/groupremove`,
        {
            chatId: selectedChat._id,
            userId: user1._id,
        },
        config
        );

        user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        fetchMessages();
        setLoading(false);
    } catch (error) {
        console.log(`UpdateGroupChatModal: handleRemove-Error Occured!`)
        setLoading(false);
    }
    setGroupChatName("");
    };

    return (
        <>
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
            >
              {selectedChat.chatName}
            </ModalHeader>
  
            <ModalCloseButton />
            <ModalBody d="flex" flexDir="column" alignItems="center">
              <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                {selectedChat.users.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    admin={selectedChat.groupAdmin}
                    handleFunction={() => handleRemove(u)}
                  />
                ))}
              </Box>
              <FormControl d="flex">
                <Input
                  placeholder="Chat Name"
                  mb={3}
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                  variant="solid"
                  colorScheme="teal"
                  ml={1}
                  isLoading={renameloading}
                  onClick={handleRename}
                >
                  Update
                </Button>
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Add User to group"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
  
              {loading ? (
                <Spinner size="lg" />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => handleRemove(user)} colorScheme="red">
                Leave Group
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default UpdateGroupChatModal