
export function RegisterStep3({ setCurrentPage }) {

    const handleClick = () => {
        setCurrentPage('dashboard')
    }

    return (
        <form className="register-form">
            <h2>Thank you!</h2>
            <button className='register-button' onClick={handleClick}>Begin</button>
        </form>
    )
}