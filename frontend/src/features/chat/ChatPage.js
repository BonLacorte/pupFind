import React, { useState } from 'react'
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';
import ChatInfo from './ChatInfo';
import { ChatState } from '../../context/ChatProvider';

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <>
    <div className="bg-customBackground min-h-screen">
      <div className="mx-auto w-screen flex justify-center flex-col pb-10 h-1/2">
        <div className='flex flex-col md:flex-row flex-grow'>
            {user && <ChatList fetchAgain={fetchAgain}/>}
            {user &&
              <ChatScreen fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
            } 
            <ChatInfo />
        </div>
      </div>
    </div>
    </>
    
  )
}

export default ChatPage