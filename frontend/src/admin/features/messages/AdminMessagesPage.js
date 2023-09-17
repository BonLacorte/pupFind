import React, { useState } from 'react'
import AdminChatList from './AdminChatList';
import AdminChatScreen from './AdminChatScreen';
import AdminChatInfo from './AdminChatInfo';
import { ChatState } from '../../../context/ChatProvider';

const AdminMessagesPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div className="mx-auto flex justify-center flex-col w-full">
      <div className="">
        <div className='flex flex-col md:flex-row'>
            {user && <AdminChatList fetchAgain={fetchAgain}/>}
            {user &&
              <AdminChatScreen fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
            } 
            <AdminChatInfo />
        </div>
      </div>
    </div>
  )
}

export default AdminMessagesPage