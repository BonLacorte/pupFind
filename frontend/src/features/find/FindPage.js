import React from 'react'
import FindHeader from './FindHeader'
import FindImage from './FindImage'
import FindResult from './FindResult'

const FindPage = () => {
  return (
    <div
      className="overflow-hidden bg-white flex flex-col justify-between pb-[340px] w-full h-[1117px] items-end"
      id="FINDMISSINGITEMRoot"
    >
      <div
        className="overflow-hidden bg-[#800000] self-stretch flex flex-row justify-between items-center px-56"
        id="NAVBAR"
      >
        <img
          src="https://file.rendit.io/n/WAJt9y5qLffPVLKIt7P9.png"
          className="self-start"
          id="Whitepupfind"
        />
        <button className="flex flex-row gap-8 h-12 items-center p-2">
          <div className="self-start flex flex-row gap-4 w-32 shrink-0 items-start">
            <div className="relative flex flex-col pb-3 w-8 shrink-0 items-end">
              <img
                src="https://file.rendit.io/n/goSDWoFq1Iv7hcyY7FW9.png"
                className="w-8 h-6 absolute top-px left-0"
                id="Envelope"
              />
              <div
                className="bg-[#da1e28] relative flex flex-col w-4 items-center px-1 py-0 rounded-lg"
                id="Badge"
              >
                <div
                  className="text-center text-xs font-sans leading-[16.8px] text-white"
                  id="Text1"
                >
                  9
                </div>
              </div>
            </div>
            <div className="font-sans font-medium tracking-[0.5] leading-[16px] text-white mt-2">
              Messages
            </div>
          </div>
          <div className="flex flex-row gap-4 w-32 shrink-0 items-center">
            <img
              src="https://file.rendit.io/n/OOFziTyAskAzaF4r8gQz.svg"
              className="self-start w-6 shrink-0"
            />
            <button
              className="font-sans font-medium tracking-[0.5] leading-[16px] text-white"
              id="ButtonText"
            >
              My Account
            </button>
          </div>
        </button>
      </div>
      <div className="flex flex-row justify-between mr-[302px] w-3/5 items-start">
        <div className="flex flex-col gap-16 items-start">
          <div className="flex flex-col gap-3 w-[415px] items-start">
            <div className="text-4xl font-['Inter'] font-semibold">
              Looking for lost item?
            </div>
            <div className="text-2xl font-['Inter'] mb-1">
              Navigate to Public Desk Information
            </div>
            <div className="text-2xl font-['Inter'] mb-1" id="LocatedIn">
              Located in:{" "}
            </div>
            <button
              className="bg-[#ffdf00] self-stretch flex flex-col justify-center h-12 shrink-0 items-center mb-1 mr-32 rounded-lg"
              id="Buttons1"
            >
              <div
                className="text-center text-lg font-['Inter'] font-semibold tracking-[-0.04] leading-[24px]"
                id="Label1"
              >
                OPEN PUP MAP
              </div>
            </button>
            <div className="text-xl font-['Inter'] w-full">
              Click this button to locate the public desk information
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 w-[417px] items-start">
            <div className="text-4xl font-['Inter'] font-semibold w-5/6">
              Report missing item
            </div>
            <button
              className="bg-[#800000] flex flex-col justify-center w-3/5 h-12 shrink-0 items-center rounded-lg"
              id="Buttons"
            >
              <div
                className="text-center text-lg font-['Inter'] font-semibold tracking-[-0.04] leading-[24px] text-white"
                id="Label"
              >
                CONNECT
              </div>
            </button>
            <div className="text-xl font-['Inter'] w-full">
              Click this button to ask for your missing item
            </div>
          </div>
        </div>
        <div className="self-end flex flex-row mb-4 gap-6 items-start">
          <div className="flex flex-col mt-2 gap-px w-56 shrink-0 items-start">
            <div className="relative flex flex-col ml-12 w-10 items-start">
              <div className="w-8 h-10 bg-[url(https://file.rendit.io/n/mssh2EwLUCyml6gMVeHa.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-1 left-2 flex flex-row justify-end gap-1 items-start pt-3 px-px">
                <div className="flex flex-col gap-1 w-1 shrink-0 h-2 items-start">
                  <img
                    src="https://file.rendit.io/n/gsjmksQmjnOpgeCWpwAF.svg"
                    className="w-1"
                  />
                  <img
                    src="https://file.rendit.io/n/OYhHjl7Ethx5w9CULRlL.svg"
                    className="ml-px w-px"
                  />
                </div>
                <div className="relative flex flex-col mt-0 w-2 shrink-0 items-start">
                  <img
                    src="https://file.rendit.io/n/BteVpgRw88dHApcvFRi9.svg"
                    className="w-px h-px absolute top-2 left-1"
                  />
                  <img
                    src="https://file.rendit.io/n/7CF2WlT7wKqBFZ36764N.svg"
                    className="relative w-2"
                  />
                </div>
              </div>
              <img
                src="https://file.rendit.io/n/D79EwfRWLVPhfhCP9cDv.svg"
                className="w-1 h-1 absolute top-5 left-1"
              />
              <img
                src="https://file.rendit.io/n/YkuaUQysOzApKVHpxt3W.svg"
                className="relative w-10"
              />
            </div>
            <div className="self-stretch relative flex flex-col items-end pt-1 pb-56">
              <img
                src="https://file.rendit.io/n/FnprJ0w38zWBTLc715wt.svg"
                className="w-32 h-64 absolute top-20 left-16"
              />
              <img
                src="https://file.rendit.io/n/JFVaOThhr6rSuWebj0gO.svg"
                className="w-20 h-[240px] absolute top-20 left-6"
              />
              <img
                src="https://file.rendit.io/n/Q4vL1q52p4RYdkOvpulU.svg"
                className="w-20 h-[108px] absolute top-0 left-6"
              />
              <img
                src="https://file.rendit.io/n/cEjCRL0RYdxDKrSPzGwb.svg"
                className="w-6 h-56 absolute top-24 left-16"
              />
              <div className="w-3/5 h-24 bg-[url(https://file.rendit.io/n/VYsIoC2725HIyVXUo7Or.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-3 left-0 flex flex-col items-start pt-12 pb-10 pl-10">
                <img
                  src="https://file.rendit.io/n/WLrPhUIucM7Q4lWGWj15.svg"
                  className="ml-2 w-8"
                />
              </div>
              <img
                src="https://file.rendit.io/n/Jp7UtKD792KBeU0w5Q1y.svg"
                className="w-20 h-8 absolute top-24 left-6"
              />
              <img
                src="https://file.rendit.io/n/T1BrK6GonjJTwmh3c4VR.svg"
                className="relative"
              />
            </div>
          </div>
          <div className="relative flex flex-col w-32 shrink-0 items-start pt-12 pb-56 px-5">
            <div className="w-20 h-48 bg-[url(https://file.rendit.io/n/e2k7Y9xWWi3tyGCLSOyT.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-[114.357421875px] left-0 flex flex-col items-end pt-16 pb-20 pr-2">
              <img
                src="https://file.rendit.io/n/L2yXiXD9p4SBsVuVnJfj.svg"
                className="w-6"
              />
            </div>
            <img
              src="https://file.rendit.io/n/sjxV3lxuNA8oy90Lqg8b.svg"
              className="w-16 h-56 absolute top-32 left-12"
            />
            <div className="w-6 h-8 bg-[url(https://file.rendit.io/n/B6PuX9TgIrDY0vkDSH7C.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat absolute top-1 left-16 flex flex-row gap-2 items-start pt-4 px-1">
              <img
                src="https://file.rendit.io/n/bkKmrE4XjtF5pq7isxcB.svg"
                className="w-px shrink-0"
              />
              <img
                src="https://file.rendit.io/n/ORdfgZG8hZWIZ5AX2SW0.svg"
                className="w-px shrink-0"
              />
            </div>
            <img
              src="https://file.rendit.io/n/bX3KAXDw8W5IrIQe0NjY.svg"
              className="w-6 h-4 absolute top-6 left-16"
            />
            <img
              src="https://file.rendit.io/n/nib95KvgFCHtqac4MfFa.svg"
              className="w-3 h-3 absolute top-4 left-16"
            />
            <img
              src="https://file.rendit.io/n/EhqwWNkS4yusOobm1BwJ.svg"
              className="w-20 h-24 absolute top-10 left-10"
            />
            <img
              src="https://file.rendit.io/n/qP7Q0XPMh7du0ZCVUL4e.svg"
              className="w-6 h-[213px] absolute top-32 left-12"
            />
            <img
              src="https://file.rendit.io/n/a35Gk1Ajpxvh1q0M5z31.svg"
              className="w-6 h-3 absolute top-2 left-16"
            />
            <img
              src="https://file.rendit.io/n/irZf6M0fSH9Ifik8kq9G.svg"
              className="w-16 h-16 absolute top-0 left-16"
            />
            <img
              src="https://file.rendit.io/n/NAgbd4ZrKmB0PfAPhk5V.svg"
              className="w-20 h-16 absolute top-16 left-12"
            />
            <img
              src="https://file.rendit.io/n/OKF6I4zUmuaYYV9wWrpj.svg"
              className="relative w-10"
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default FindPage