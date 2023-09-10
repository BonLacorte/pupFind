import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'

import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'

const Login = () => {
  const emailRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    emailRef.current.focus()
}, [])

useEffect(() => {
    setErrMsg('');
}, [email, password])


const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        // console.log('email: ', email)
        // console.log('password: ', password)
        const data = await login({ email, password }).unwrap()
        const accessToken = data.accessToken
        localStorage.setItem("userInfo", JSON.stringify(data))
        console.log(`response`, data)
        dispatch(setCredentials({ accessToken }))
        setEmail('')
        setPassword('')
        navigate('/dash/')
    } catch (err) {
        if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg(err.data?.message);
        }
        errRef.current.focus();
    }
}

const handleEmailInput = (e) => setEmail(e.target.value)
const handlePwdInput = (e) => setPassword(e.target.value)
const handleToggle = () => setPersist(prev => !prev)

const handleGuestCredentials = () => {
    setEmail('guest@example.com');
    setPassword('123456');
  };

const errClass = errMsg ? "errmsg" : "offscreen"

if (isLoading) return <p>Loading...</p>

const content = (
        <section className="public">
        <header>
            <h1 className="text-3xl font-bold mb-6">Customer Login</h1>
        </header>
        <main className="login">
            <p ref={errRef} className={`${errClass} text-red-500 mb-4`} aria-live="assertive">
            {errMsg}
            </p>

            <form className="form" onSubmit={handleSubmit}>
            {/* <form className="form"> */}
            <label htmlFor="email" className="block mb-2">
                Email:
            </label>
            <input
                className="form__input w-full mb-4 px-4 py-2 border rounded"
                type="text"
                id="email"
                ref={emailRef}
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
            <button className="form__submit-button w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                Sign In
            </button>
            <button
                className="form__submit-button w-full py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                type="button" // Change the type to "button" to prevent form submission
                onClick={handleGuestCredentials}
            >
                Get Guest User Credentials
            </button>

            <label htmlFor="persist" >
                    <input
                        type="checkbox"
                        className="form__checkbox"
                        id="persist"
                        onChange={handleToggle}
                        checked={persist}
                    />
                    Trust This Device
                </label>
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
};

export default Login;
