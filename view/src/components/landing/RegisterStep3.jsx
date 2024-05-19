import { Link } from 'react-router-dom';

export function RegisterStep3() {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            window.location.href = '/dashboard'
        }
    }

    window.addEventListener('keydown', handleKeyPress)

    return (
        <div className="register-form">
            <h2>Thank you!</h2>
            <Link to='/dashboard' className='register-button'>Begin</Link>
        </div>
    )
}