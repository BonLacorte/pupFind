import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminEditUserForm = ({ user, onUpdateUser }) => {
    const [name, setName] = useState(user.name);
    const [idNum, setIdNum] = useState(user.uid);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [specification, setSpecification] = useState(user.specification || '');
    const [twitterLink, setTwitterLink] = useState(user.twitterLink || '');
    const [facebookLink, setFacebookLink] = useState(user.facebookLink || '');

    const onNameChanged = (e) => setName(e.target.value);
    const onIdNumChanged = (e) => setIdNum(e.target.value);
    const onEmailChanged = (e) => setEmail(e.target.value);
    const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);
    const onSpecificationChanged = (e) => setSpecification(e.target.value);
    const onTwitterLinkChanged = (e) => setTwitterLink(e.target.value);
    const onFacebookLinkChanged = (e) => setFacebookLink(e.target.value);

    // Function to update user data
    const updateUser = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const updatedUserData = {
                name,
                email,
                uid: idNum,
                phoneNumber,
                specification,
                twitterLink,
                facebookLink,
            };

            const response = await axios.put(`http://localhost:3500/user/${user._id}`, updatedUserData, config);

            onUpdateUser(response.data); // Call the callback function to update the user in the parent component

            console.log('User updated:', response.data);
        } catch (error) {
            console.log('User update failed:', error);
        }
    };

    return (
        <div className="mx-auto w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={updateUser}>
                {/* Form inputs for editing user data */}
                {/* Similar to the inputs in AdminNewUserForm.js */}
                {/* You can reuse your input components here */}
                
                <div className="text-center">
                    <button type="submit" className="bg-primaryColor text-white font-bold py-2 px-4 rounded">
                        Update User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminEditUserForm;
