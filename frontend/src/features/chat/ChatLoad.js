import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const ChatLoad = () => {

    const { selectedReport, setSelectedReport } = ChatState();

    const { accessToken } = useAuth();
    const { founderId, setFounderId } = useState()
    const { reportId, setReportId } = useState()

    const consoleLogs = () => {
        console.log(`${selectedReport} from chatLoad`)
    }
    
    useEffect(() => {
        fetchLostItem();
    }, []);

    const fetchLostItem = async (selectedReport) => {
        try {
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };
            // setReportId(selectedReport)
            const { data } = await axios.get(`http://localhost:3500/lostitems/${selectedReport}`, config);
    
            setFounderId(data.founder._id)
            // console.log(`${reportId} - reportId on ChatLoad`)
            console.log(`${founderId} - founderId on ChatLoad`)
            
        } catch (error) {
            console.log(error);
        }
    };


    // const handleAccessChat = async (userId) => {
    //     try {
    //         console.log(`handleAccessChat (userId)`,userId)

    //         setLoadingChat(true);
    //         const config = {
    //             headers: {
    //             "Content-type": "application/json",
    //             token: `Bearer ${accessToken}`,
    //             },
    //         };

    //         const { data } = await axios.post(`http://localhost:3500/chat`, { userId }, config);
    //         console.log(`data from accessChat`, data)

    //         if (!chats.find((c) => c._id === data._id)) {
    //             setChats([data, ...chats])
    //         }
            

    //         console.log(`chats in Header`,chats) // 

    //         setSelectedChat(data)
    //         console.log(`setSelectedChat`, setSelectedChat)
    //         setLoadingChat(false)
    //         toggleDrawer()
    //     } catch (err) {
    //         console.log(err)
    //         // setLoadingChat(false)
    //         // toast("Error, handleAccesschat", { autoClose: 7000, position: toast.POSITION.BOTTOM_LEFT })
    //     }
    // }

    // const content = 
    
    // const fetch = fetchLostItem(selectedReport)

    return (
        <>
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={consoleLogs}>Go</button>
        </>
    )
}

export default ChatLoad