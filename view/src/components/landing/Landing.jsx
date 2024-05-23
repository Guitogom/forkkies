import { Link } from 'react-router-dom'
import '../../styles/Landing.css'
import { BackArrow } from '../../assets/svg/BackArrow.jsx'
import { useEffect } from 'react'
import arrow from '/src/assets/media/arrow.svg';
import i1 from '/src/assets/media/c_img/i1.jpeg';
import i2 from '/src/assets/media/c_img/i2.jpeg';
import i3 from '/src/assets/media/c_img/i3.jpeg';
import i4 from '/src/assets/media/c_img/i4.jpeg';
import i5 from '/src/assets/media/c_img/i5.jpeg';
import i6 from '/src/assets/media/c_img/i6.jpeg';
import i7 from '/src/assets/media/c_img/i7.jpeg';
import i8 from '/src/assets/media/c_img/i8.jpeg';
import i9 from '/src/assets/media/c_img/i9.jpeg';
import i10 from '/src/assets/media/c_img/i10.jpeg';
import i11 from '/src/assets/media/c_img/i11.jpeg';
import tick from '/src/assets/media/tick.svg';

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
                        <div className="box-landing"><img src={i2} alt='' /></div>
                        <div className="box-landing"><img src={i6} alt='' /></div>
                        <div className="box-landing-four">
                            <div className="box-landing-cube"><img src={i1} alt="" /></div>
                            <div className="box-landing-cube"><img src={i1} alt="" /></div>
                            <div className="box-landing-cube"><img src={i1} alt="" /></div>
                            <div className="box-landing-cube"><img src={i1} alt="" /></div>
                        </div>
                        <div className="box-landing"><img src={i5} alt='' /></div>
                        <div className="box-landing"><img src={i3} alt='' /></div>
                        <div className="box-landing"><img src={i4} alt='' /></div>
                    </div>
                    <div className='scroll-landing'>
                        <div className="box-landing"><img src={i2} alt='' /></div>
                        <div className="box-landing"><img src={i6} alt='' /></div>
                        <div className="box-landing-four">
                            <div className="box-landing-cube"><img src={i1} alt="" /></div>
                            <div className="box-landing-cube"><img src={i1} alt="" /></div>
                            <div className="box-landing-cube"><img src={i1} alt="" /></div>
                            <div className="box-landing-cube"><img src={i1} alt="" /></div>
                        </div>
                        <div className="box-landing"><img src={i5} alt='' /></div>
                        <div className="box-landing"><img src={i3} alt='' /></div>
                        <div className="box-landing"><img src={i4} alt='' /></div>
                    </div>
                </div>
                <section className='center-landing'>
                    <h1 className='title-landing'>FORKKIES</h1>
                    <h3 className='subtitle-landing'>Self-service online orders</h3>
                    <Link to='/register' className='get-started-landing'>Get Started <BackArrow /></Link>
                    <div className='login-message-landing'>You already have an account?<img className='arrow-landing' src={arrow} alt="Arrow" /></div>
                    <Link to='/login' className='log-in-landing'>Log In</Link>
                    <h3 className='message-landing'>START NOW FOR FREE</h3>
                    <div className='advise-landing'>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/V5icOAp9_RA?si=bE_1cpY5JhIYxbH9&amp;controls=0" title="Add" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div>
                    <div className='actions-landing'>
                        <p className='action-landing action1-landing'>create</p>
                        <p className='action-landing action2-landing'>manage</p>
                        <p className='action-landing action3-landing'>customize</p>
                        <p className='action-landing action4-landing'>track</p>
                    </div>
                </section>
                <div className='side-landing right-side-landing'>
                    <div className='scroll-landing'>
                        <div className="box-landing"><img src={i10} alt='' /></div>
                        <div className="box-landing"><img src={i8} alt='' /></div>
                        <div className="box-landing-four">
                            <div className="box-landing-cube"><img src={i9} alt="" /></div>
                            <div className="box-landing-cube"><img src={i9} alt="" /></div>
                            <div className="box-landing-cube"><img src={i9} alt="" /></div>
                            <div className="box-landing-cube"><img src={i9} alt="" /></div>
                        </div>
                        <div className="box-landing"><img src={i1} alt='' /></div>
                        <div className="box-landing"><img src={i7} alt='' /></div>
                        <div className="box-landing"><img src={i11} alt='' /></div>
                    </div>
                    <div className='scroll-landing'>
                        <div className="box-landing"><img src={i10} alt='' /></div>
                        <div className="box-landing"><img src={i8} alt='' /></div>
                        <div className="box-landing-four">
                            <div className="box-landing-cube"><img src={i9} alt="" /></div>
                            <div className="box-landing-cube"><img src={i9} alt="" /></div>
                            <div className="box-landing-cube"><img src={i9} alt="" /></div>
                            <div className="box-landing-cube"><img src={i9} alt="" /></div>
                        </div>
                        <div className="box-landing"><img src={i1} alt='' /></div>
                        <div className="box-landing"><img src={i7} alt='' /></div>
                        <div className="box-landing"><img src={i11} alt='' /></div>
                    </div>
                </div>
            </div>
            <div className='features-landing'>
                <h2>Why us?</h2>
                <div className='feature-landing'>
                    <img src={tick} alt="tick" />
                    <p>Easy to deploy</p>
                </div>
                <div className='feature-landing'>
                    <img src={tick} alt="tick" />
                    <p>High customitzation</p>
                </div>
                <div className='feature-landing'>
                    <img src={tick} alt="tick" />
                    <p>Multiple languages</p>
                </div>
                <div className='feature-landing'>
                    <img src={tick} alt="tick" />
                    <p>For all needs and businesses</p>
                </div>
                <div className='feature-landing'>
                    <img src={tick} alt="tick" />
                    <p>Tracking and analytics</p>
                </div>
                <div className='feature-landing'>
                    <img src={tick} alt="tick" />
                    <p>Secure and private paying options</p>
                </div>
            </div>
        </main >
    )
}