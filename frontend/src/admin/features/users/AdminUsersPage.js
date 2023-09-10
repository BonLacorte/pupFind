import React, { useEffect, useState } from 'react';
import useAdminAuth from '../../hooks/useAdminAuth';
import axios from 'axios';
import AdminNewUserForm from './AdminNewUserForm';
import AdminEditUserForm from './AdminEditUserForm';

const AdminUsersPage = () => {
    const { userId, name, accessToken } = useAdminAuth();

    const [selectedCategoryReport, setSelectedCategoryReport] = useState('Student');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]); // State to store users
    const [showAddUserForm, setShowAddUserForm] = useState(false); // State to control form visibility
    const [editingUser, setEditingUser] = useState(null); // Store user data for editing

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
            console.log(data);
            setUsers(data); // Set the users in state
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditUser = (user) => {
        setEditingUser(user); // Set the user data to edit
        setShowAddUserForm(false); // Hide the Add User Form
    };

    const handleAddUser = () => {
        setEditingUser(null); // Clear editing state
        setShowAddUserForm(true); // Show the Add User Form
    };

    const handleUpdateUser = (updatedUserData) => {
        // Update the user data in the users array
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) => {
                if (user._id === updatedUserData._id) {
                    return updatedUserData;
                }
                return user;
            });
            return updatedUsers;
        });

        setEditingUser(null); // Clear editing state
        setShowAddUserForm(false); // Hide the Add User Form
    };

    const toggleFormVisibility = () => {
        setShowAddUserForm(!showAddUserForm);
    };

    const content = (
        <>
            <div className='p-20 w-full border-l-amber-600'>
                <div className='pb-4 flex justify-between'>
                <h1 className='text-3xl font-bold text-primaryColor'>
                        {editingUser ? 'Edit User' : showAddUserForm ? 'Create an Account' : 'Users'}
                    </h1>

                    <div className="flex pb-2">
                        <button
                            onClick={() => {
                                setShowAddUserForm(!showAddUserForm);
                                setEditingUser(null); // Clear editing state when toggling forms
                            }}
                            className='bg-primaryColor text-white w-full font-bold py-2 px-2 rounded mr-2'
                        >
                            {editingUser ? 'See User Table' : showAddUserForm ? 'Add New User' : 'See User Table'}
                        </button>
                        {!showAddUserForm && !editingUser && (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
                {showAddUserForm ? (
                    <AdminNewUserForm onAddUser={handleAddUser} />
                ) : editingUser ? (
                    <AdminEditUserForm user={editingUser} onUpdateUser={handleUpdateUser} />
                ) : (
                    <div className="flex justify-center">
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
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-3">
                                            <div className='flex flex-row items-center '>
                                                <img src={user.pic.url} alt="" className="w-10 h-10 rounded-full mr-2"/>
                                                {user.name}        
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">{user.uid}</td>
                                        <td className="px-6 py-3">{user.specification}</td>
                                        <td className="px-6 py-3">{user.email}</td>
                                        <td className="px-6 py-3">{user.phoneNumber || '-'}</td>
                                        <td className="px-6 py-3">
                                            <button
                                                onClick={() => handleEditUser(user)}
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            {/* {editingUser && (
                <AdminEditUserForm user={editingUser} onUpdateUser={handleUpdateUser} />
            )} */}
            </div>
        </>
    );

    return content;
};

export default AdminUsersPage;
