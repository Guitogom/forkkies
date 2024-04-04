import { Link } from 'react-router-dom';

export function Landing({ setCurrentPage }) {
    return (
        <header>
            <h1>Landing Page</h1>
            <Link to="/login" onClick={() => setCurrentPage('login')}>Login</Link>
            <Link to="/register" onClick={() => setCurrentPage('register')}>Register</Link>
        </header>
    );
}