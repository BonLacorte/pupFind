import React from 'react'
import { Link } from 'react-router-dom'

const DonePage = () => {
    return (
        <div className="bg-white flex flex-col justify-between p-20 w-full ml-80">
            <div className="flex flex-row justify-between w-3/5 items-start ">
                <div className="flex flex-col  gap-4  shrink-0 items-start ">
                    <div className="flex flex-col gap-3 w-full items-start ">
                        <div className="text-4xl font-semibold w-full">
                        Thankyou for reporting found item
                        </div>
                        <div className="text-2xl mb-1 w-3/5">
                        To surrender found item please proceed to the Public Desk Office{" "}
                        </div>
                        <div className="text-2xl mb-1" id="LocatedIn">
                        Located in:{" "}
                        </div>
                        <Link to={`/dash/found/locate`}>
                            <button className="bg-secondaryColor flex flex-col justify-center w-[280px] h-12 shrink-0 items-center rounded-lg">
                                <div className="text-center text-lg font-semibold tracking-[-0.04] leading-[24px]">
                                    OPEN PUP MAP
                                </div>
                            </button>
                        </Link>
                        
                        <div className="text-xl w-3/5 mt-10">
                            Click this button if you successfully surrendered the item in the Public
                            Desk Office{" "}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4 w-[417px] items-start">
                        {/* <div className="text-4xl font-semibold w-5/6">
                            Report missing item
                        </div> */}
                        <Link to={`/dash/`}>
                            <button className="bg-primaryColor flex flex-col justify-center h-12 shrink-0 items-center rounded-lg">
                                <div className="text-center text-lg font-semibold tracking-[-0.04] leading-[24px] text-white mx-16">
                                    DONE
                                </div>
                            </button>
                        </Link>
                        <div className="text-xl w-full">
                            Click this button to ask for your missing item
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonePage