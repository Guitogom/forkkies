import { Link } from 'react-router-dom';

export function Error() {
    return (
        <div className="general-error">
            <h1>Oops...</h1>
            <p>It seems that something went wrong</p>
            <img src="" alt="" />
            <Link to='/'>Go Home</Link>
        </div>
    )
}