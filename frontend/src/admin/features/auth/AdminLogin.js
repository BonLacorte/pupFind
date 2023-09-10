import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './adminAuthSlice'
import { useLoginMutation } from './adminAuthApiSlice'

import useAdminPersist from '../../hooks/useAdminPersist'

const AdminLogin = () => {
    const emailRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('')
    const [adminPersist, setAdminPersist] = useAdminPersist()

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation()
    // const { isFetching, error } = useSelector((state) => state.user);

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const data = await login({ email, password }).unwrap()
        const accessToken = data.accessToken
        localStorage.setItem("userInfo", JSON.stringify(data))
        console.log(`response`, data)
        dispatch(setCredentials({ accessToken }))
        setEmail('')
        setPassword('')
        navigate('/admin/dash')
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
const handleToggle = () => setAdminPersist(prev => !prev)

const errClass = errMsg ? "errmsg" : "offscreen"

if (isLoading) return <p>Loading...</p>

  const content = (
    <section className="public">
        <header>
            <h1>Employee and Admin Login</h1>
        </header>
        <main className="login">
            <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    className="form__input"
                    type="text"
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={handleEmailInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    className="form__input"
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                />
                <button className="form__submit-button">Sign In</button>

                <label htmlFor="persist" >
                    <input
                        type="checkbox"
                        className="form__checkbox"
                        id="persist"
                        onChange={handleToggle}
                        checked={adminPersist}
                    />
                    Trust This Device
                </label>
            </form>
        </main>
        <footer>
            <Link to="/">Back to Home</Link>
        </footer>
    </section>
  )
  return content
};

export default AdminLogin;
