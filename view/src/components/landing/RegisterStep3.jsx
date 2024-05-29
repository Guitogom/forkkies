import { Link, useNavigate } from 'react-router-dom';

export function RegisterStep3() {
    const navigate = useNavigate()

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate('/dashboard')
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