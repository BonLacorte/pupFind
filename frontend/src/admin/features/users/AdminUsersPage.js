import React, { useEffect, useState } from 'react'
import useAdminAuth from '../../hooks/useAdminAuth';
import axios from 'axios';

const AdminUsersPage = () => {

    const { userId, name, accessToken } = useAdminAuth()

    const [selectedCategoryReport, setSelectedCategoryReport] = useState('Student');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]); // State to store users

    const handleCategoryChange = (e) => {
        setSelectedCategoryReport(e.target.value);
    };      

    const fetchUsers = async () => {
        try {
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };

            const { data } = await axios.get(`http://localhost:3500/user/`, config);
            console.log(data)
            setUsers(data); // Set the users in state
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);


    const tableContent = users.map((user) => (
        <tr key={user._id}>
            <td className="px-6 py-3">
                <div className='flex flex-row items-center '>
                    <img src={user.pic.url} alt="" className="w-10 h-10 rounded-full mr-2"/>
                    {user.name}        
                </div>
            </td>
            <td className="px-6 py-3">{user._id}</td>
            <td className="px-6 py-3">{user.specification}</td>
            <td className="px-6 py-3">{user.email}</td>
            <td className="px-6 py-3">{user.phoneNumber || '-'}</td>
            <td className="px-6 py-3">
                <button
                    onClick={() => {
                        // Handle edit action here
                    }}
                    className="bg-white text-blue-500 font-bold py-2 px-2 rounded mr-2"
                >
                    Edit
                </button>
                <button
                    // onClick={() => handleDeleteUser(user._id)}
                    className="bg-white text-red-500 font-bold py-2 px-2 rounded"
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    const content = (
        <>
            <div className='p-20 w-full border-l-amber-600'>
                <div className='pb-4 flex justify-between'>
                    <h1 className='text-3xl font-bold text-primaryColor'>Users</h1>

                    <div className="flex pb-2">
                        <button className='bg-primaryColor text-white w-full font-bold py-2 px-2 rounded mr-2'>
                            {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                            Add new user
                        </button>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg mr-2"
                        />
                        <select
                            name="category"
                            id="category"
                            value={selectedCategoryReport}
                            onChange={handleCategoryChange}
                            className="bg-gray-100 border-2 w-full px-2 py-1 rounded-lg"
                        >
                            <option value="Student">Student</option>
                            <option value="Professor">Professor</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                    {/* <div>
                        <button className='border bg-red-700' onClick={consoleLogs}>Click Here</button>
                    </div> */}
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Name</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Id</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Section</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Email</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Contact</th>
                                <th scope="col" className="px-6 py-3 bg-customBackground text-left text-sm font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </>
    )

    return content
}

export default AdminUsersPage