import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegisterMutation } from './authApiSlice'

const Signup = () => {

    const [register, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRegisterMutation()

    const nameRef = useRef()
    const errRef = useRef()
    const [name, setName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    // const [picLoading, setPicLoading] = useState(false);
    const [picPreview, setPicPreview] = useState();
    const [errMsg, setErrMsg] = useState('')
    // const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
//   const dispatch = useDispatch();

//   const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    // useEffect(() => {
    //     if (isSuccess) {
    //         setName('')
    //         setEmail('')
    //         setPassword('')
    //         setConfirmpassword('')
    //         setPic()
    //         setPicPreview()
    //         navigate('/')
    //     }
    // }, [navigate, isSuccess])


    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const { accessToken } = await login({ email, password }).unwrap()
    //         dispatch(setCredentials({ accessToken }))
    //         setEmail('')
    //         setPassword('')
    //         navigate('/chat')
    //     } catch (err) {
    //         if (!err.status) {
    //             setErrMsg('No Server Response');
    //         } else if (err.status === 400) {
    //             setErrMsg('Missing Username or Password');
    //         } else if (err.status === 401) {
    //             setErrMsg('Unauthorized');
    //         } else {
    //             setErrMsg(err.data?.message);
    //         }
    //         errRef.current.focus();
    //     }
    // }

    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleConfirmPwdInput = (e) => setConfirmpassword(e.target.value)
    const handleNameInput = (e) => setName(e.target.value)

    //handle and convert it in base 64
    const handleImage = (e) =>{

        const file = e.target.files[0];

        // Empty the image state (reset)
        setPic();
        setPicPreview();

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setPicPreview(reader.result);
                setPic(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const canSave = [name, email, password].every(Boolean) && !isLoading
    const canSaveContents = [name, email, password, pic ]

    const handleRegister = async (e) => {
        e.preventDefault()
        // console.log("canSave:", canSave);
        console.log("canSaveContents:", canSaveContents);
        if (canSave) {
            console.log("canSave:", canSave);
            console.log("canSaveContents:", canSaveContents);
            if (pic === undefined) {
                setPic("")
            } 
            await register({ name, email, password, pic })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className="public">
        <header>
        <h1 className="text-3xl font-bold mb-6">Customer Signup</h1>
        </header>
        <main className="signup">
        <p ref={nameRef} className={`${errClass} text-red-500 mb-4`} aria-live="assertive">
            {errMsg}
        </p>

        <form className="form" onSubmit={handleRegister}>
        {/* <form className="form" > */}

            <label htmlFor="name" className="block mb-2">
            Name:
            </label>
            <input
            className="form__input w-full mb-4 px-4 py-2 border rounded"
            type="text"
            id="name"
            ref={nameRef}
            onChange={handleNameInput}
            value={name}
            required
            />

            <label htmlFor="email" className="block mb-2">
            Email:
            </label>
            <input
            className="form__input w-full mb-4 px-4 py-2 border rounded"
            type="text"
            id="email"
            value={email}
            onChange={handleEmailInput}
            autoComplete="off"
            required
            />

            <label htmlFor="password" className="block mb-2">
            Password:
            </label>
            <input
            className="form__input w-full mb-4 px-4 py-2 border rounded"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
            />

            <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password:
            </label>
            <input
            className="form__input w-full mb-4 px-4 py-2 border rounded"
            type="password"
            id="confirmPassword"
            onChange={handleConfirmPwdInput}
            value={confirmpassword}
            required
            />

            <label label className="block mb-2" htmlFor="image">
            Avatar:
            </label>
            <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImage}
            />

            <div className="grid grid-cols-3 gap-4 py-2">
                <img className="w-full h-auto object-contain" src={pic} alt="" />
            </div>

            <button className="form__submit-button w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Sign Up
            </button>
        </form>
        </main>
        <footer>
        <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
        </Link>
        </footer>
    </section>
    )
    return content
}

export default Signup