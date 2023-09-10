import React from 'react'
import { Link } from 'react-router-dom'

const HomePage1 = () => {
    return (
        <div className="bg-white flex flex-row gap-16 w-full items-start">
            <div className="relative flex flex-col w-1/2 items-start">
                <img alt="" src="https://file.rendit.io/n/6pqpGxjbbyM1B8AnjoDp.svg" className="w-[111px] h-40 absolute top-24 left-0"/>
                <img alt="" src="https://file.rendit.io/n/ie3uLONPA3AolpchPRvB.png" className="relative left-0 bottom-44"/>
            </div>
            <div className="relative flex flex-col mt-44 gap-10 items-start">
                <div className="flex flex-col items-start">
                    <div className="self-stretch relative flex flex-col items-start pb-32 px-[148px]">
                        <div className="text-[128px] font-semibold text-primaryColor absolute top-[113px] left-0 h-40 w-[526px]">
                            PUPFind
                        </div>
                        <img alt="" src="https://file.rendit.io/n/033oE67RrtllAVLok4Ha.png" className="relative" />
                    </div>
                    <div className="text-2xl font-semibold text-primaryColor ml-2">
                        Find what's lost, surrender what's found
                    </div>
                </div>
                <div className="flex flex-row ml-2 gap-5 w-[509px] items-start">
                    <Link to={`/dash/missing`}>
                        <button className="bg-primaryColor flex flex-col justify-center w-60 h-12 items-center">
                            <div className="text-center text-lg font-semibold tracking-[-0.04] leading-[24px] text-white">
                                    FIND LOST ITEM
                            </div>
                        </button>
                    </Link>
                    <Link to={`/dash/found/new`}>
                        <button className="bg-secondaryColor flex flex-col justify-center w-60 h-12 items-center">
                            <div className="text-center text-lg font-semibold tracking-[-0.04] leading-[24px] text-[#161616]">
                                    REPORT FOUND ITEM
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage1