import React from 'react'

const MissingLocatePage = () => {
    return (
        <div className="bg-white flex flex-col justify-between p-20 w-full">
          <div className="flex flex-col gap-10 items-start mx-64">
            <div className="flex flex-col ml-1 gap-4 items-start">
              <div className="flex flex-col gap-2 items-start">
                <div className="text-4xl font-bold">
                  Looking for lost item?
                </div>
                <div className="text-2xl font-['Inter'] mb-4 w-full">
                  Navigate to Public Desk Information
                </div>
              </div>
              <div className="text-2xl">
                Located in:{" "}
              </div>
            </div>
            <div
              className="bg-[url(https://file.rendit.io/n/unU6eyC1dmu4czappPWp.png)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat self-stretch flex flex-col h-[650px] shrink-0 items-start pl-1 py-1"
              id="Image1"
            >
              <img alt=""
                src="https://file.rendit.io/n/FxZ4THCYy33zbaBV44gg.svg"
                className="w-8"
                id="Xsquare"
              />
            </div>
          </div>
        </div>


    )
}

export default MissingLocatePage