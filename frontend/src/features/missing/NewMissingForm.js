import React, { useState } from 'react'
import { Locations } from '../config/Locations';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const NewMissingForm = () => {

    const currentDate = new Date().toISOString().split('T')[0];
    const {accessToken, userId, name} = useAuth();
    const { selectedChat, setSelectedChat, chats, setChats, selectedReport, setSelectedReport } = ChatState();

    const [itemName, setItemName] = useState("");
    const [dateFound, setDateFound] = useState("");
    const [selectedLocation, setSelectedLocation] = useState('Claimable');
    const [itemDescription, setItemDescription] = useState("");
    const [image, setImage] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [loadingChat, setLoadingChat] = useState(false)

    const onItemNameChanged = (e) => setItemName(e.target.value);
    const onDateFound = (e) => setDateFound(e.target.value);
    const onLocationChanged = (e) => setSelectedLocation(e.target.value);
    const onDescriptionChanged = (e) => setItemDescription(e.target.value);

    //handle and convert it in base 64
    const handleImage = (e) =>{

        const files = Array.from(e.target.files);

        console.log("files:", files);
        // Empty the image array (reset)
        setImage([]);
        setImagesPreview([]);

        // const file = e.target.files[0];

        files.forEach((file) => {
            const reader = new FileReader();
        
            reader.onload = () => {
                if (reader.readyState === 2) {
                setImagesPreview((old) => [...old, reader.result]);
                setImage((old) => [...old, reader.result]);
                }
            };
        
            reader.readAsDataURL(file);


            // setFileToBase(file);
            console.log(file);
            console.log("image length:", image.length);
        });
    }

    const options = Object.values(Locations).map(location => {
        return (
            <option
                key={location}
                value={location}
            > 
                {location}
            </option >
        )
    })

    const canSave = [itemName, itemDescription, dateFound, selectedLocation !== 'Choose Location', image,] 

    // const addReport = async (founderId, itemId, event) => {
    //     event.preventDefault()
    //     console.log(canSave)
    //     console.log(name)
    //     // console.log(userId)
    //     // console.log(Object.values(Locations).map(location => {
    //     //     return (
    //     //         location
    //     //     )
    //     // }))
    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-type": "application/json",
    //                 token: `Bearer ${accessToken}`,
    //             },
    //         };
            
    //         const { data } = await axios.post(`http://localhost:3500/missingitems`,
    //             {
    //                 itemName: itemName, 
    //                 itemDescription: itemDescription, 
    //                 dateLost: dateFound, 
    //                 possibleLocationLost: selectedLocation, 
    //                 image,
    //                 founder: userId
    //             },
    //         config
    //         );

    //         console.log(`New Found Item - data `,data)
    //     } catch (error) {
    //         console.log(error)
    //         console.log('NewReportForm')
    //     };

    //     // FetchChats
    //     try {
    //         const config = {
    //         headers: {
    //             token: `Bearer ${accessToken}`,
    //             },
    //         };

    //         const { data } = await axios.get(`http://localhost:3500/chat`, config);
    //         console.log(`data from FetchChats = data `, data)
    //         setChats(data);
    //         console.log(`data from FetchChats = chats `,chats)
    //     } catch (err) {
    //         console.log(`${err} - in FetchChats`)
    //     }
        
    //     // HandleAccessChat
    //     try {
    //     console.log(`HandleAddLostItemProcessesToChatData (founderId)`,founderId)
    //     console.log('founderId ',founderId)
    //     console.log('itemId ',itemId)
    //     setLoadingChat(true);
    //     const config = {
    //         headers: {
    //         "Content-type": "application/json",
    //         token: `Bearer ${accessToken}`,
    //         },
    //     };
    
    //     const { data } = await axios.post(`http://localhost:3500/chat/add-lostitem-processes`, { userId: founderId, lostItemId: id }, config);
    //     console.log(`data from HandleAccessChat = data`, data)
    
    //     if (!chats.find((c) => c._id === data._id)) {
    //         setChats([data, ...chats])
    //     }
        
    //     console.log(`List of Chats`,chats)
    
    //     setSelectedChat(data)
    //     console.log(`setSelectedChat`, setSelectedChat)
    //     setLoadingChat(false)
    //     } catch (err) {
    //     console.log(`${err} - in HandleAccessChat`)
    //     }
    // }

    return (
        <div className="bg-white flex flex-col">
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-row gap-12 w-2/3 items-start">
                    <div className="flex flex-col mt-20 w-[885px] items-start">
                        <h1 className="text-4xl font-bold ml-56 mb-8">
                        Report your missing item
                        </h1>
                        <div className="self-stretch relative flex flex-row gap-20 items-start">
                            <img alt="" src="https://file.rendit.io/n/Vs3SPW5koaPg2jwztsQY.svg" className="w-[272px] h-2 absolute top-[787.136474609375px] left-0"/>
                            <div className="self-end relative flex flex-col w-[147px] shrink-0 items-start">
                                <img alt="" src="https://file.rendit.io/n/d4pFfFHPbtM6Gj5j2YWE.svg" className="w-20 h-16 absolute top-64 left-0" />
                                <img alt="" src="https://file.rendit.io/n/KPfOZKCRuRSFGmey9AWj.svg" className="w-12 h-56 absolute top-24 left-0" />
                                <img alt="" src="https://file.rendit.io/n/lnOSNwFIl9xHUHBhIDjt.svg" className="relative"/>
                            </div>
                            {/* <div className="border-solid border-[#dde1e6] bg-white relative flex flex-col justify-center mb-[301px] gap-6 w-[655px] items-start pt-4 pb-5 px-4 border"> */}
                            <div className="border-solid bg-white font-boldflex flex-col justify-center mb-[301px] w-full p-4 border">
                                <div className="text-lg font-sans font-bold leading-[19.8px] text-[#21272a] px-4">
                                    <h1 className='text-2xl'>
                                        Missing Item detail
                                    </h1>
                                </div>
                                <form className="p-4 flex flex-col">
                                    <div className="flex flex-row w-full">
                                        <div className="w-1/2 mr-4">
                                            <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                                Item Name:
                                            </label>
                                            <input
                                                className="bg-gray-100 border-2 w-full px-2 py-1 "
                                                id="name"
                                                name="name"
                                                type="text"
                                                autoComplete="off"
                                                value={itemName}
                                                onChange={onItemNameChanged}
                                            />
                                        </div>
                                        <div className="w-1/2 ">
                                            <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                                Date Found:
                                            </label>
                                            <input
                                                className="bg-gray-100 border-2 w-full p-2 py-1 "
                                                id="name"
                                                name="name"
                                                type="date"
                                                max={currentDate}
                                                value={dateFound}
                                                onChange={onDateFound}
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full mt-4'>
                                        <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                            Possible Location Lost:
                                        </label>
                                        <select
                                            name="location"
                                            id="location"
                                            value={selectedLocation}
                                            onChange={onLocationChanged}
                                            className="bg-gray-100 border-2 w-full px-2 py-1 "
                                        >
                                            {options}
                                        </select>
                                    </div>
                                    <div className="w-full mt-4">
                                        <label className="block mb-2" htmlFor="name"><span className='text-red-500'>*</span>
                                            Item Description:
                                        </label>
                                        <textarea className="bg-gray-100 border-2 w-full px-2 py-1 "
                                            id="description"
                                            name="description"
                                            rows={4}
                                            value={itemDescription}
                                            onChange={onDescriptionChanged}
                                        />
                                    </div>
                                    <div className="w-full mt-2">
                                        <label className="block mb-2" htmlFor="image"><span className='text-red-500'>*</span>
                                        Item Image:
                                        </label>
                                        <input
                                            className="bg-gray-100 border-2 w-full px-2 py-1"
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImage}
                                            multiple
                                        />

                                        <div className="grid grid-cols-3 gap-4 py-2">
                                            {imagesPreview.map((image, index) => (
                                                <img className="w-full h-auto object-contain" key={index} src={image} alt="Product Preview" />
                                            ))}
                                        </div>
                                    </div>

                                    <button className="border-solid border-primaryColor bg-primaryColor flex flex-col justify-center h-12 shrink-0 items-center border-2 mt-4">
                                        <button className="font-sans font-medium tracking-[0.5] leading-[16px] text-white mx-6">
                                            Submit report
                                        </button>
                                    </button>
                                    
                                </form>
                                <div className="self-stretch flex flex-col mr-2 items-end">
                                </div>
                            </div>
                        </div>
                </div>
                    <img alt=""
                        src="https://file.rendit.io/n/HWteCwo9jA1tQzkDVzQp.svg"
                        className="mt-16"
                    />
                </div>
                <div className="self-end relative flex flex-col w-56 shrink-0 items-start">
                    <img alt=""
                        src="https://file.rendit.io/n/AyZ958KVZDdkvBnClSIZ.svg"
                        className="w-40 h-40 absolute top-16 left-16"
                        id="Ellipse"
                    />
                    <img alt=""
                        src="https://file.rendit.io/n/52Gyzn7j1eB4irdFrXjv.svg"
                        className="w-32 h-[286px] absolute top-24 left-24"
                        id="Ellipse1"
                    />
                    <img alt=""
                        src="https://file.rendit.io/n/i41HWlHDYSfHPajsbj4O.svg"
                        className="relative"
                        id="Ellipse2"
                    />
                </div>
            </div>
        </div>
    )
}

export default NewMissingForm