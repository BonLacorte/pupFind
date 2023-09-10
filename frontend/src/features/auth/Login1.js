import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import pup1 from '../../img/PUP5.jpg';
import pup2 from '../../img/PUP.jpg';
import pup3 from '../../img/PUP2.jpg';
import pup4 from '../../img/PUP3.jpg';
import pup5 from '../../img/PUP4.jpg';
import puplogo from '../../img/puplogo.png';

const Login = () => {
    const emailRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    // Background Photos
    const backgroundPhotos = [pup1, pup2, pup3, pup4, pup5];
    const [currentBackgroundPhotoIndex, setCurrentBackgroundPhotoIndex] = useState(0);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentBackgroundPhotoIndex((prevIndex) => (prevIndex + 1) % backgroundPhotos.length);
        }, 8000);

        return () => {
        clearInterval(intervalId);
        };
    }, [backgroundPhotos.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
    };

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev) => !prev);

    const errClass = errMsg ? 'errmsg' : 'offscreen';

    if (isLoading) return <p>Loading...</p>;

    const content = (
        <section
        className="public min-h-screen flex items-center justify-center bg-cover"
        style={{
            backgroundImage: `url(${backgroundPhotos[currentBackgroundPhotoIndex]})`,
        }}
        >
        <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl shadow-md p-10 w-96">
        {/* <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl shadow-md p-14 w-80"> */}
            <header className="text-center">
            <img src={puplogo} alt="PUP Logo" className="w-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">PUP Find</h1>
            <p className=" text-sm my-2">Sign in to start your session</p>
            </header>
            <main className="space-y-4">
            <p ref={errRef} className={`text-red-500 ${errClass}`} aria-live="assertive">
                {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
                <div className="space-y-1">
                <label htmlFor="email" className="text-gray-600 font-semibold">
                    Email:
                </label>
                <input
                    className="border border-gray-300 p-2 rounded-md w-full"
                    type="text"
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={handleEmailInput}
                    autoComplete="off"
                    required
                />
                </div>
                <div className="space-y-1 mt-2">
                <label htmlFor="password" className="text-gray-600 font-semibold">
                    Password:
                </label>
                <input
                    className="border border-gray-300 p-2 rounded-md w-full"
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                />
                </div>
                <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    className="form__checkbox border-gray-300 rounded focus:ring-gray-400"
                    id="persist"
                    onChange={handleToggle}
                    checked={persist}
                />
                <label htmlFor="persist" className="text-gray-600">
                    Trust This Device
                </label>
                </div>
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md w-full mt-4">
                Sign In
                </button>
                <div className="text-center mt-4">
                <Link to="#" className="text-red-700 font-semibold hover:underline">
                    I forgot my password
                </Link>
                </div>
                <div className="text-center text-sm mt-4">
                By using this service, you understand and agree to the PUP Online Services Terms of Use and Privacy Statement
                </div>
            </form>
            </main>
            <footer className="mt-4">
            {/* <Link to="/" className="text-blue-500 hover:underline">
                Back to Home
            </Link> */}
            </footer>
        </div>
        </section>
    );

    return content;
};

export default Login;
