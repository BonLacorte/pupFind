import { Link } from 'react-router-dom';

const Public = () => {
    const content = (
        // <section className="h-screen">
        //     <header>
        //         <h1 className='text-3xl font-bold'>PUPfind</h1>
        //     </header>
        //     <main className="w-full border flex flex-row">
        //         {/* <p>Located in Sta. Mesa. Manila</p>
        //         <address className="public__addr">
        //             PUPFind<br />
        //             Sta. Mesa<br />
        //             Manila<br />
        //             <a href="tel:+15555555555">(555) 555-5555</a>
        //         </address>
        //         <br /> */}
        //         {/* <p>Owner: Dan Davidson</p> */}
        //         <div className='w-1/2'>
        //             {/* put image here */}
        //         </div>
        //         <div className='w-1/2'>
        //             {/* logo */}
        //             <h1 className='text-2xl font-bold'>PUPFind</h1>
        //         </div>
        //     </main>
        //     {/* <footer>
        //         <Link to="/login">Employee Login</Link>
        //     </footer> */}
        // </section>

        <div className="bg-white flex flex-row gap-16 w-full items-start">
            <div className="w-full bg-primaryColor absolute top-0 left-0 flex flex-row justify-between items-center px-56" id="NAVBAR">
                <img alt=""
                src="https://file.rendit.io/n/lR73tpTfe2DprtLbazzZ.png"
                className="self-start"/>
                <div className="flex flex-row gap-8 h-12 items-center p-2">
                    <button className="self-start flex flex-row gap-4 w-32 shrink-0 items-start">
                        <div className="relative flex flex-col pb-3 w-8 shrink-0 items-end">
                            {/* <img alt=""
                                src="https://file.rendit.io/n/P8cQrPTjOFdfN5wPuSX4.png"
                                className="w-8 h-6 absolute top-px left-0"
                                id="Envelope"
                            />
                            <div
                                className="bg-prima relative flex flex-col w-4 items-center px-1 py-0 rounded-lg"
                                id="Badge"
                            >
                                <div
                                className="text-center text-xs font-sans leading-[16.8px] text-white"
                                id="Text1"
                                >
                                9
                                </div>
                            </div> */}
                        </div>
                        <div className="font-sans font-medium tracking-[0.5] leading-[16px] text-white mt-2">
                            {/* Messages */}
                        </div>
                    </button>
                    <div className="flex flex-row gap-4 w-32 shrink-0 items-center">
                        {/* <img alt=""
                        src="https://file.rendit.io/n/zTAMToJwUTu7k5AEf6hs.svg"
                        className="self-start w-6 shrink-0"
                        />
                        <button
                        className="font-sans font-medium tracking-[0.5] leading-[16px] text-white"
                        id="ButtonText"
                        >
                        My Account
                        </button> */}
                    </div>
                </div>
            </div>
            <div className="bg-white flex flex-row gap-16 w-full items-start mt-[89px]">
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
                    <Link to={`/login`}>
                        <button className="bg-primaryColor flex flex-col justify-center w-60 h-12 items-center">
                            <div className="text-center text-lg font-semibold tracking-[-0.04] leading-[24px] text-white">
                                    LOGIN
                            </div>
                        </button>
                    </Link>
                    <Link to={`/login`}>
                        <button className="bg-secondaryColor flex flex-col justify-center w-60 h-12 items-center">
                            <div className="text-center text-lg font-semibold tracking-[-0.04] leading-[24px] text-[#161616]">
                                    REGISTER
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            </div>
        </div>

    )
    return content
}
export default Public