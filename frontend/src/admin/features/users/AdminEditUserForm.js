import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminEditUserForm = ({ user }) => {

    const [name, setName] = useState(user.name);
    const [idNum, setIdNum] = useState(user.uid);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedMembership, setSelectedMembership] = useState(user.membership);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [specification, setSpecification] = useState(user.specification)
    const [image, setImage] = useState(user.pic.url);
    const [imagesPreview, setImagesPreview] = useState(user.pic.url);
    const [twitterLink, setTwitterLink] = useState(user.twitterLink)
    const [facebookLink, setFacebookLink] = useState(user.facebookLink)
    const [specificationLabel, setSpecificationLabel] = useState('');

    const onNameChanged = (e) => setName(e.target.value);
    const onIdNumChanged = (e) => setIdNum(e.target.value);
    const onEmailChanged = (e) => setEmail(e.target.value);
    const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);
    const onSpecificationChanged = (e) => setSpecification(e.target.value);
    const onTwitterLinkChanged = (e) => setTwitterLink(e.target.value);
    const onFacebookLinkChanged = (e) => setFacebookLink(e.target.value);
    // const onMembershipChange = (e) => setSelectedMembership(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);
    const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);
    const onMembershipChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedMembership(selectedValue);

        // Set the specification label based on the selected membership
        switch (selectedValue) {
            case 'Student':
                setSpecificationLabel('Section: (Ex: BSIT 3-2)');
                break;
            case 'Professor':
                setSpecificationLabel('Department: (Ex: CCIS)');
                break;
            case 'Staff':
                setSpecificationLabel('Role: (Ex: Utility)');
                break;
            default:
                setSpecificationLabel('Section: (Ex: BSIT 3-2)');
                break;
        }
    };

    // Function to handle image selection
    // Handle and convert it in base 64
    const handleImageSelection = (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const file = files[0]; // Get the first selected file

            const reader = new FileReader();

            reader.onload = () => {
                // Display the selected image in a circular frame
                setImagesPreview(reader.result);
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    // Function to trigger the file input when the circular frame is clicked
    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };

    const canEdit = [name, email, image, selectedMembership, phoneNumber, specification, twitterLink, facebookLink, password] 

    // Function to update user data
    const updateUser = async () => {
        console.log(canEdit)
        // event.preventDefault();
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
                pic: image,
                membership: selectedMembership,
                specification,
                twitterLink,
                facebookLink,
            };

            const { data } = await axios.put(`http://localhost:3500/user/${user._id}`, updatedUserData, config);

            updateUser(data); // Call the callback function to update the user in the parent component

            console.log('User updated:', data);
        } catch (error) {
            console.log('User update failed:', error);
        }
    };

    return (
        <>
            <div className='p-20 w-full border-l-amber-600'>
                <div className='pb-4 flex justify-between'>
                    <h1 className='text-3xl font-bold text-primaryColor'>
                    Edit User
                    </h1>

                    <div className="flex pb-2">
                        <button
                            className='bg-primaryColor text-white w-full font-bold py-2 px-2 rounded mr-2'
                        >
                            <Link to={`/admin/dash/users/`} className="">
                                See User Table
                            </Link>
                            
                        </button>
                    </div>
                </div>
                <div className=" mx-auto w-1/2 ">
                    <div
                        className="w-32 h-32 rounded-full overflow-hidden cursor-pointer mx-auto relative avatar-container"
                        onClick={handleImageClick}
                    >
                        <div
                            className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 avatar-overlay"
                        >
                            <label className="cursor-pointer text-white font-semibold">
                                Change Avatar
                                {/* <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageSelection}
                                /> */}
                            </label>
                        </div>
                        {imagesPreview && (
                            <img
                                src={imagesPreview}
                                alt="Selected Avatar"
                                className="w-full h-full object-cover"
                            />
                        )}
                        {!imagesPreview && (
                            <div className="w-full h-full bg-gray-300 flex justify-center items-center text-gray-600">
                                <span>Click to upload</span>
                            </div>
                        )}
                    </div>
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageSelection}
                    />
                    {/* <div className='flex flex-row justify-center items-center'>
                        <h2 className="text-md justify-center items-center text-primaryColor">
                            *Click the image to edit user avatar
                        </h2>
                    </div> */}
                    <div className='flex flex-row justify-center items-center mb-4 mt-4'>
                        
                        <h2 className="text-2xl font-semibold mr-2">
                            I am a PUPian
                            
                        </h2>
                        <select
                            name="category"
                            id="category"
                            value={selectedMembership}
                            onChange={onMembershipChange}
                            className="bg-gray-100 border-2 px-2 py-1 rounded-lg text-primaryColor font-semibold"
                        >
                            <option value="Student">Student</option>
                            <option value="Professor">Professor</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    
                    <form onSubmit={updateUser} className=''>
                        <div className="flex flex-row w-full mb-4">
                            <div className="w-1/2 mr-4">
                                <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                    Name:
                                </label>
                                <input
                                    className="bg-gray-100 border-2 w-full px-2 py-1 "
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="off"
                                    value={name}
                                    onChange={onNameChanged}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                    ID Number:
                                </label>
                                <input
                                    className="bg-gray-100 border-2 w-full px-2 py-1 "
                                    id="id-no"
                                    name="id-no"
                                    type="text"
                                    autoComplete="off"
                                    value={idNum}
                                    onChange={onIdNumChanged}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full mb-4">
                            <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                Email:
                            </label>
                            <input
                                className="bg-gray-100 border-2 w-full px-2 py-1 "
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="off"
                                value={email}
                                onChange={onEmailChanged}
                            />
                        </div>
                        <div className="flex flex-row w-full mb-4">
                            <div className="w-1/2 mr-4">
                                <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                    Phone number:
                                </label>
                                <input
                                    className="bg-gray-100 border-2 w-full px-2 py-1 "
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="off"
                                    value={phoneNumber}
                                    onChange={onPhoneNumberChanged}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                    {selectedMembership === 'Student' ? 'Section: (Ex: BSIT 3-2)' : selectedMembership === 'Professor' ? 'Department: (Ex: CCIS)' : 'Role: (Ex: Utility)'}
                                </label>
                                <input
                                    className="bg-gray-100 border-2 w-full px-2 py-1 "
                                    id="id-no"
                                    name="id-no"
                                    type="text"
                                    autoComplete="off"
                                    value={specification}
                                    onChange={onSpecificationChanged}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full mb-4">
                            <label className="block mb-2" htmlFor="name">
                                Twitter link:
                            </label>
                            <input
                                className="bg-gray-100 border-2 w-full px-2 py-1 "
                                id="twt-link"
                                name="twt-link"
                                type="text"
                                autoComplete="off"
                                value={twitterLink}
                                onChange={onTwitterLinkChanged}
                            />
                        </div>
                        <div className="flex flex-col w-full mb-4">
                            <label className="block mb-2" htmlFor="name">
                                Facebook link:
                            </label>
                            <input
                                className="bg-gray-100 border-2 w-full px-2 py-1 "
                                id="fb-link"
                                name="fb-link"
                                type="text"
                                autoComplete="off"
                                value={facebookLink}
                                onChange={onFacebookLinkChanged}
                            />
                        </div>
                        <div className="flex flex-row w-full mb-8">
                            <div className="w-1/2 mr-4">
                                <label className="block mb-2" htmlFor="name">
                                    Password:
                                </label>
                                <input
                                    className="bg-gray-100 border-2 w-full px-2 py-1 "
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={onPasswordChanged}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block mb-2" htmlFor="name">
                                    Confirm password:
                                </label>
                                <input
                                    className="bg-gray-100 border-2 w-full px-2 py-1 "
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    value={confirmPassword}
                                    onChange={onConfirmPasswordChanged}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-primaryColor text-white font-bold py-2 px-4 rounded">
                                Update User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminEditUserForm;
