import React, { useState } from 'react';
import useAdminAuth from '../../hooks/useAdminAuth';
import axios from 'axios';

const AdminNewUserForm = ({ onAddUser }) => {

    const {accessToken, userId} = useAdminAuth();

    const [name, setName] = useState("");
    const [idNum, setIdNum] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [itemDescription, setItemDescription] = useState("");
    const [selectedMembership, setSelectedMembership] = useState('Student');
    const [phoneNumber, setPhoneNumber] = useState("")
    const [specification, setSpecification] = useState("")
    const [image, setImage] = useState([]);
    const [imagesPreview, setImagesPreview] = useState();
    const [twitterLink, setTwitterLink] = useState("")
    const [facebookLink, setFacebookLink] = useState("")

    const onNameChanged = (e) => setName(e.target.value);
    const onIdNumChanged = (e) => setIdNum(e.target.value);
    const onEmailChanged = (e) => setEmail(e.target.value);
    const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);
    const onSpecificationChanged = (e) => setSpecification(e.target.value);
    const onTwitterLinkChanged = (e) => setTwitterLink(e.target.value);
    const onFacebookLinkChanged = (e) => setFacebookLink(e.target.value);
    const onMembershipChange = (e) => setSelectedMembership(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);
    const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);

    // Function to handle image selection
    // Handle and convert it in base 64
    const handleImageSelection = (e) => {
        const file = e.target.files[0];

        if (file) {
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

    const canSave = [name, email, image, selectedMembership, phoneNumber, specification, twitterLink, facebookLink, password] 

    // Create user
    const createUser = async (event) => {
        console.log(canSave)
        event.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    token: `Bearer ${accessToken}`,
                },
            }
            const { data } = await axios.post('http://localhost:3500/user/new/new', {
                name,
                email,
                uid: idNum,
                password,
                pic: image,
                membership: selectedMembership,
                phoneNumber,
                specification,
                twitterLink,
                facebookLink
            }, 
            config
            );
            console.log('User registered:', data);
        } catch (error) {
            console.log('User registration failed:', error);
        }
    }

    return (
        <div className=" mx-auto w-1/2 ">
            <div
                className="w-32 h-32 rounded-full overflow-hidden cursor-pointer mx-auto mb-4"
                onClick={handleImageClick}
            >
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
            <div className='flex flex-row justify-center items-center mb-4'>
                
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
            
            <form onSubmit={createUser} className=''>
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
                            Section:    <i>(Ex: BSIT 3-2)</i>
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
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminNewUserForm;
