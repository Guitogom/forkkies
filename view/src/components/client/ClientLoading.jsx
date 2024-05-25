import { useState, useEffect } from 'react'

export function ClientLoading() {
    const [text, setText] = useState('Loading...');

    useEffect(() => {
        const interval = setInterval(() => {
            setText(prevText => {
                switch (prevText) {
                    case 'Loading':
                        return 'Loading.'
                    case 'Loading.':
                        return 'Loading..'
                    case 'Loading..':
                        return 'Loading...'
                    default:
                        return 'Loading'
                }
            })
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="client-loading">
            <div className="spinning-wheel">
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" className="hds-flight-icon--animation-loading"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#000000" fillRule="evenodd" clipRule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg>
            </div>
            <p className="loading-text">{text}</p>
            <p style={{ position: 'absolute', bottom: '40px', color: '#D7D7D7' }}>Powered by Forkkies</p>
        </section>
    )
}