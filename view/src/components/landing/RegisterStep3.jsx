import { Link } from 'react-router-dom';

export function RegisterStep3() {

    return (
        <div className="register-form">
            <h2>Thank you!</h2>
            <Link to='/dashboard' className='register-button'>Begin</Link>
        </div>
    )
}