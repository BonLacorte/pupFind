import { Link } from 'react-router-dom';

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1 className='text-3xl font-bold underline'>Welcome to <span className="nowrap">PUP Find!</span></h1>
            </header>
            <main className="public__main">
                <p>Located at PUP Main, provides Lost & Found services online. Look for your missing items anytime, anywhere!</p>
                
                <br />
                <p>Project by: BSIT 3-2 Group 2</p>
            </main>
            <footer>
                <Link to="/login">User Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public