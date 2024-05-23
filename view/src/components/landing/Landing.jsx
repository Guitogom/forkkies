import { Link } from 'react-router-dom'
import '../../styles/Landing.css'
import { BackArrow } from '../../assets/svg/BackArrow.jsx'
import { useEffect } from 'react'
import arrow from '/src/assets/media/arrow.svg';

export function Landing() {
    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            window.location.href = '/dashboard'
        }
    }, [])

    return (
        <main className='landing-base'>
            <div className="header-landing">
                <div className='side-landing left-side-landing'>
                    <div className='scroll-landing'>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                        <div className="box-landing-four">
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                        </div>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                    </div>
                    <div className='scroll-landing'>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                        <div className="box-landing-four">
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                        </div>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                    </div>
                </div>
                <section className='center-landing'>
                    <h1 className='title-landing'>FORKKIES</h1>
                    <h3 className='subtitle-landing'>Self-service online orders</h3>
                    <Link to='/register' className='get-started-landing'>Get Started <BackArrow /></Link>
                    <div className='login-message-landing'>You already have an account?<img className='arrow-landing' src={arrow} alt="Arrow" /></div>
                    <Link to='/login' className='log-in-landing'>Log In</Link>
                    <h3 className='message-landing'>START NOW FOR FREE</h3>
                    <div className='actions'>
                        <p className='action-landing action1-landing'>create</p>
                        <p className='action-landing action2-landing'>manage</p>
                        <p className='action-landing action3-landing'>customize</p>
                        <p className='action-landing action4-landing'>track</p>
                    </div>
                </section>
                <div className='side-landing right-side-landing'>
                    <div className='scroll-landing'>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                        <div className="box-landing-four">
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                        </div>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                    </div>
                    <div className='scroll-landing'>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                        <div className="box-landing-four">
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                            <div className="box-landing-cube"></div>
                        </div>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                        <div className="box-landing"></div>
                    </div>
                </div>
            </div>
        </main >
    )
}