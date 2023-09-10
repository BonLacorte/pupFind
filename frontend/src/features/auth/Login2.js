import React from 'react'

const Login2 = () => {
    return (
        <div>
            <div className="flex flex-col pb-40 w-full" id="NewRootRoot">
                <div
                    className="bg-[url(https://file.rendit.io/n/g4eoOceOgsMNY9tH4yG3.png)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col mr-20 h-[1117px] shrink-0 items-center pt-[180px] pb-[236px]"
                    id="Image1"
                >
                    <div className="overflow-hidden bg-white/80 flex flex-col justify-center gap-16 items-center pt-20 pb-16 px-12">
                    <div className="self-start flex flex-col mr-5 gap-4 w-[379px]">
                        <img
                        src="https://file.rendit.io/n/5pyyBYSenXUcULM3TFOo.png"
                        className="self-center mb-3"
                        id="Redlogo"
                        />
                        <div className="bg-[#f8f8f8] flex flex-col justify-center pl-3 h-12 shrink-0 items-start mb-3 ml-1 rounded">
                        <div className="text-xl font-['Inter'] font-light">Username</div>
                        </div>
                        <div className="bg-[#f8f8f8] flex flex-col justify-center pl-3 h-12 shrink-0 items-start mb-2 ml-1 rounded">
                        <div className="text-xl font-['Inter'] font-light text-[#040404]">
                            Password
                        </div>
                        </div>
                        <button className="flex flex-col ml-1" id="Signinbutton">
                        <button
                            className="bg-[#800000] flex flex-col justify-center h-12 shrink-0 items-center"
                            id="SignInButton"
                        >
                            <div className="text-xl font-['Inter'] font-light text-[#cdcdcd]">
                            Sign in
                            </div>
                        </button>
                        </button>
                        <div className="text-xl font-['Inter'] text-[#9c3c3c] self-center mb-1">
                        I forgot my password
                        </div>
                        <div className="text-center text-sm font-['Inter'] font-light self-start">
                        By using this service, you understood and agree to
                        <br /> the PUP Online Services Terms of Use <br />
                        and Privacy Statement
                        </div>
                    </div>
                    <div className="text-sm font-['Inter'] underline leading-[19.6px] text-[#800000]">
                        No account yet? Sign Up
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Login2