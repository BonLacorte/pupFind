import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
// import useTitle from "../../hooks/useTitle";
import { toast } from 'react-toastify';
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PRODUCT_NAME_REGEX = /^.{2,25}$/;
const DESCRIPTION_REGEX = /^.{2,100}$/;
// const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

const NewReportForm = () => {
    
    const {accessToken, userId} = useAuth();
    const currentDate = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [dateFound, setDateFound] = useState("");
    const [locationFound, setLocationFound] = useState("");
    const [image, setImage] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const onItemNameChanged = (e) => setItemName(e.target.value);
    const onDescriptionChanged = (e) => setItemDescription(e.target.value);
    const onLocationFoundChanged = (e) => setLocationFound(e.target.value);
    const onDateFound = (e) => setDateFound(e.target.value);
    // const onImagesChanged = (e) => setImage(e.target.value);

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

    const canSave = [itemName, itemDescription, dateFound, locationFound, image,] 

    const addReport = async (event) => {
        event.preventDefault()
        console.log(canSave)
        console.log(userId)
        // try {
        //     const config = {
        //         headers: {
        //             "Content-type": "application/json",
        //             token: `Bearer ${accessToken}`,
        //         },
        //     };
            
        //     const { data } = await axios.post(`http://localhost:3500/lostitems`,
        //         {
        //             itemName: itemName, 
        //             itemDescription: itemDescription, 
        //             dateFound: dateFound, 
        //             locationFound: locationFound, 
        //             image,
        //             founder: userId
        //         },
        //     config
        //     );

        //     console.log(`SingleChat sendMessage-data`,data)
        // } catch (error) {
        //     console.log(error)
        //     console.log('NewReportForm')
        // };
    }

    return (
        <>
            <div className="bg-customBackground min-h-screen">
                <div className="mx-auto w-3/5 flex justify-center flex-col pb-10">
                    <div>
                        <h1 className="my-4 text-2xl">
                            New Found Report
                        </h1>
                    </div>
                    <form className="bg-white p-4 flex flex-col" onSubmit={addReport}>
                        <div className="flex flex-row">
                            <div className="w-1/2 mr-4">
                                <label className="block mb-2" htmlFor="name">
                                    Item Name:
                                </label>
                                <input
                                    className= {`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${itemName === '' ? 'text-gray-400' : ''} `}
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="off"
                                    value={itemName}
                                    onChange={onItemNameChanged}
                                />

                                <label className="block mb-2" htmlFor="description">
                                    Description:
                                </label>
                                <textarea
                                    className= {`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${itemDescription === '' ? 'text-red-400' : ''} `}
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={itemDescription}
                                    onChange={onDescriptionChanged}
                                />

                                <label className="block mb-2" htmlFor="name">
                                    Date Found:
                                </label>
                                <input
                                    className= {`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${dateFound === '' ? 'text-gray-400' : ''} `}
                                    id="name"
                                    name="name"
                                    type="date"
                                    max={currentDate}
                                    value={dateFound}
                                    onChange={onDateFound}
                                />

                                <label className="block mb-2" htmlFor="name">
                                    Location Found:
                                </label>
                                <input
                                    className= {`w-full py-2 px-4 mb-4 border text-black border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${locationFound === '' ? 'text-gray-400' : ''} `}
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="off"
                                    value={locationFound}
                                    onChange={onLocationFoundChanged}
                                />
                            </div>

                            <div className="w-1/2 mr-4">
                                <label className="block mb-2" htmlFor="image">
                                image:
                                </label>
                                <input
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
                        </div>
                        <div className="flex justify-center ">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                                title="Save"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </>
    );
};

export default NewReportForm;
