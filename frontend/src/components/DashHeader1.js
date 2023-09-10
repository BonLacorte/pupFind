import React from 'react'
import { Link } from 'react-router-dom'

const DashHeader1 = () => {
    return (
        <>
            <div className="w-full bg-primaryColor top-0 left-0 flex flex-row justify-between items-center px-56">
                <Link to={`/dash`}>
                    <img alt="" src="https://file.rendit.io/n/lR73tpTfe2DprtLbazzZ.png" className="self-start"/>
                </Link>
                <div className="flex flex-row gap-8 h-12 items-center p-2">
                    <button className="self-start flex flex-row gap-4 w-32 shrink-0 items-start">
                        <div className="relative flex flex-col pb-3 w-8 shrink-0 items-end">
                        <img alt="" src="https://file.rendit.io/n/P8cQrPTjOFdfN5wPuSX4.png" className="w-8 h-6 absolute top-px left-0" />
                        <div className="bg-[#da1e28] relative flex flex-col w-4 items-center px-1 py-0 rounded-lg">
                            <div className="text-center text-xs font-sans leading-[16.8px] text-white">
                                9
                            </div>
                        </div>
                        </div>
                        <div className="font-sans font-medium tracking-[0.5] leading-[16px] text-white mt-2">
                            <Link to={`/dash/chats`}>
                                Messages
                            </Link>
                        </div>
                    </button>
                    <button className="flex flex-row gap-4 w-32 shrink-0 items-center">
                        <img alt="" src="https://file.rendit.io/n/zTAMToJwUTu7k5AEf6hs.svg" className="self-start w-6 shrink-0" />
                        <div className="font-sans font-medium tracking-[0.5] leading-[16px] text-white"> 
                            
                            <Link to={`/dash/profile`}>
                                My Account
                            </Link>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default DashHeader1