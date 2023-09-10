import React, { useState }from 'react'
import Login from '../auth/Login1'
import Signup from '../auth/Signup'

const HomePage = () => {

  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md">
        <ul className="flex mb-4">
          <li
            className={`w-1/2 text-center py-2 cursor-pointer rounded-tl-lg rounded-bl-lg ${
              activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => handleTabClick('login')}
          >
            Login
          </li>
          <li
            className={`w-1/2 text-center py-2 cursor-pointer rounded-tr-lg rounded-br-lg ${
              activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => handleTabClick('signup')}
          >
            Signup
          </li>
        </ul>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {activeTab === 'login' ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
}

export default HomePage