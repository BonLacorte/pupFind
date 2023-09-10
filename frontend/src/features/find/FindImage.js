import React, { useState } from 'react'

const FindImage = () => {

    const [avatar, setAvatar] = useState([]);
    const [avatarPreview, setAvatarPreview] = useState([]);

    //handle and convert it in base 64
    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        
        console.log("files:", files);

        setAvatar([]);
        setAvatarPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
        
            reader.onload = () => {
                if (reader.readyState === 2) {
                setAvatarPreview([reader.result]);
                setAvatar([reader.result]);
                }
            };
        

            reader.readAsDataURL(file);
            console.log(file);
            console.log("avatar length:", avatar.length);
        });
    };

    return (
        <div className="w-1/3 bg-white p-4 border-r border-gray-400">
            <div className="mb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back
                </button>
            </div>
            <div>
                <h1 className="text-2xl font-bold">SmartFind</h1>
            </div>
            {/* <div className="mb-4">
                <img
                src=""
                alt=""
                className="w-full rounded-lg shadow-md border border-gray-300"
                />
            </div> */}
            <div className="mb-4">
                {avatarPreview.map((avatar, index) => (
                    <img className="w-full h-auto object-contain" key={index} src={avatar} alt="User Preview" />
                ))}
            </div>
            <div className="mb-4">
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Select another image
                </button> */}
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                />
            </div>
            <div className="mb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Find now
                </button>
            </div>
        </div>
    )
}

export default FindImage