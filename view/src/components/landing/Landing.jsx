import React from 'react'
import '../../styles/Landing.css'
import { BackArrow } from '../../assets/svg/BackArrow.jsx'

export function Landing({ setCurrentPage }) {
    return (
        <main className='landing-base'>
            <div className="header-landing">
                <aside className='side-landing left-side-landing'>
                    <div className="box-landing"></div>
                </aside>
                <section className='center-landing'>
                    <h1 className='title-landing'>FORKKIES</h1>
                    <h3 className='subtitle-landing'>Self-service online orders</h3>
                    <button onClick={() => setCurrentPage('register')} className='get-started-landing'>Get Started <BackArrow /></button>
                    <p>You already have an account</p>
                    <button onClick={() => setCurrentPage('login')} className='log-in-landing'>Log In</button>
                </section>
                <aside className='side-landing right-side-landing'>
                    <div className="box-landing"></div>
                </aside>
            </div>
        </main>
    )
}