import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import sha256 from 'crypto-js/sha256'
import { Title } from "../../Title"
import '../../../../styles/Management.css'

export function Management({ business, businessName, setBusinessName }) {
    const [primary, setPrimary] = useState(business.color1)
    const [secondary, setSecondary] = useState(business.color2)
    const [action, setAction] = useState(business.color3)
    const [theme, setTheme] = useState(business.color4)

    const { tag } = useParams()

    const [passwordVerified, setPasswordVerified] = useState(false)
    const [loadingFetch, setLoadingFetch] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const token = localStorage.getItem('session_token');

    useEffect(() => {
        const debouncedUpdateColor = setTimeout(() => {
            updateColor('color1', primary)
        }, 1000)

        return () => clearTimeout(debouncedUpdateColor)
    }, [primary])

    useEffect(() => {
        const debouncedUpdateColor = setTimeout(() => {
            updateColor('color2', secondary)
        }, 1000)

        return () => clearTimeout(debouncedUpdateColor)
    }, [secondary])

    useEffect(() => {
        const debouncedUpdateColor = setTimeout(() => {
            updateColor('color3', action)
        }, 1000)

        return () => clearTimeout(debouncedUpdateColor)
    }, [action])

    useEffect(() => {
        const debouncedUpdateColor = setTimeout(() => {
            updateColor('color4', theme)
        }, 1000)

        return () => clearTimeout(debouncedUpdateColor)
    }, [theme])

    const updateColor = (colorType, colorValue) => {
        const body = {}
        body[colorType] = colorValue

        fetch('https://api.forkkies.live/modifybusiness', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Error:', response.statusText)
                }
                return response.json()
            })
            .catch(error => {
                console.error('Error:', error.message)
            })
    }

    const [newName, setNewName] = useState(businessName)

    const handleChangeName = () => {
        setBusinessName(newName)
        updateName(newName)
    }

    const updateName = (newName) => {
        const body = {
            name: newName
        }

        fetch('https://api.forkkies.live/modifybusiness', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Error:', response.statusText)
                }
                return response.json()
            })
            .catch(error => {
                console.error('Error:', error.message)
            })
    }

    const handleLogOut = () => {
        localStorage.removeItem('session_token')
        navigate('/')
    }

    const handleWriteCurrentPassword = (e) => {
        setPasswordError('')
        setCurrentPassword(e.target.value)
    }

    const handleWriteNewPassword = (e) => {
        setPasswordError('')
        setNewPassword(e.target.value)
    }

    const handleRepeatNewPassword = (e) => {
        setPasswordError('')
        setRepeatNewPassword(e.target.value)
    }

    const handleVerifyPassword = async () => {
        setLoadingFetch(true)
        try {
            const hashedPassword = sha256(currentPassword).toString()
            const response = await fetch(`https://api.forkkies.live/logbusiness?tag=${business.tag}&password=${hashedPassword}`)
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setLoadingFetch(false)
                setPasswordVerified(true)
            } else {
                setLoadingFetch(false)
                setPasswordError('Wrong password')
                console.error('Error:', response.statusText)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    const changePassword = () => {
        setPasswordError('')
        let hasError = false

        if (newPassword !== repeatNewPassword) {
            setPasswordError("Passwords don't match")
            hasError = true
        }

        if (newPassword === '') {
            setPasswordError("Password can't be empty")
            hasError = true
        }

        if (repeatNewPassword === '') {
            setPasswordError("Repeat password can't be empty")
            hasError = true
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPassword)) {
            setPasswordError("Password must have 8 digits, one number and one letter")
            hasError = true
        }

        if (hasError) return

        changePasswordFetch()
    }

    const changePasswordFetch = async () => {
        const hashedPassword = sha256(newPassword).toString()
        const body = {
            password: hashedPassword
        }

        fetch('https://api.forkkies.live/modifybusiness', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Error:', response.statusText)
                } else {
                    setPasswordVerified(false)
                    setNewPassword('')
                    setRepeatNewPassword('')
                    setCurrentPassword('')
                }
                return response.json()
            })
            .catch(error => {
                console.error('Error:', error.message)
            })
    }

    const [tagMessage, setTagMessage] = useState(false)

    const tagClick = () => {
        setTagMessage(true)
        setTimeout(() => {
            setTagMessage(false)
        }, 600)
    }

    return (
        <section>
            <Title title="Management" text="Management" />
            <div className="management-flex">
                <div className="management-bubble">
                    <h2>My Business</h2>
                    <div className="management-bubble-inner my-business">
                        <p className={`management-inner-tag ${tagMessage ? 'animating' : ''}`} onClick={tagClick}>/{business.tag}</p>
                        <label htmlFor="changeName">Business Name</label>
                        <div className="management-business-name">
                            <input type="text" value={newName} id="changeName" onChange={(e) => setNewName(e.target.value)} />
                            <button onClick={handleChangeName}>Change</button>
                        </div>
                        <button onClick={handleLogOut} className="management-log-out-button">Log out <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 7.63636L14 4.5C14 4.22386 13.7761 4 13.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 19.5C4 19.7761 4.22386 20 4.5 20L13.5 20C13.7761 20 14 19.7761 14 19.5L14 16.3636" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                    </div>
                </div>
                <div className="management-bubble">
                    <h2>Theme</h2>
                    <div className="management-bubble-inner">
                        <div className="management-colors">
                            <div style={{ backgroundColor: primary }}>
                                <label htmlFor="change-primary-color">Primary Color</label>
                                <input type="color" name="change-primary-color" id="change-primary-color" value={primary} onChange={(e) => setPrimary(e.target.value)} />
                            </div>
                            <div style={{ backgroundColor: secondary }}>
                                <label htmlFor="change-secondary-color">Secondary Color</label>
                                <input type="color" name="change-secondary-color" id="change-secondary-color" value={secondary} onChange={(e) => setSecondary(e.target.value)} />
                            </div>

                            {/* <div style={{ backgroundColor: action }}>
                            <label htmlFor="change-call-to-action-color">Text Color</label>
                            <input type="color" name="change-call-to-action-color" id="change-call-to-action-color" value={action} onChange={(e) => setAction(e.target.value)} />
                        </div> */}
                            <div style={{ backgroundColor: theme }}>
                                <label htmlFor="change-theme-color">Background Color</label>
                                <input type="color" name="change-theme-color" id="change-theme-color" value={theme} onChange={(e) => setTheme(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="management-bubble">
                    <h2>Credentials</h2>
                    <div className="management-bubble-inner credentials">
                        <div className="old-password-verification" style={{ opacity: `${passwordVerified ? '0' : '1'}`, zIndex: `${passwordVerified ? '0' : '4'}` }}>
                            <label htmlFor="old-password" className="management-credentials-label">Introduce Current Password:</label>
                            <input type="password" id="old-password" className={`management-credentials-input ${passwordError !== '' ? 'wrong' : ''}`} onChange={handleWriteCurrentPassword} />
                            <button className={`management-credentials-button ${loadingFetch ? 'loading' : ''}`} onClick={handleVerifyPassword}>
                                {loadingFetch ? (
                                    <div className="loading-dots">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                ) : 'Verify'}
                            </button>
                        </div>
                        <div className="new-password-input" style={{ opacity: `${passwordVerified ? '1' : '0'}`, zIndex: `${passwordVerified ? '4' : '0'}` }}>
                            <label htmlFor="new-password" className="management-credentials-label">Introduce New Password:</label>
                            <p className='register-password-text'>Password must have 8 digits, one number and one letter</p>
                            <input type="password" id="new-password" className={`management-credentials-input ${passwordError !== '' ? 'wrong' : ''}`} onChange={handleWriteNewPassword} />
                            <label htmlFor="repeat-new-password" className="management-credentials-label">Repeat New Password:</label>
                            <input type="password" id="repeat-new-password" className={`management-credentials-input ${passwordError !== '' ? 'wrong' : ''}`} onChange={handleRepeatNewPassword} />
                            <button onClick={changePassword}>Change Password</button>
                        </div></div>
                </div>
                <div className="management-bubble">
                    <h2>Special access</h2>
                    <div className="management-bubble-inner">
                        <p className="coming-soon">Coming soon...</p>
                    </div>
                </div>
                <div className="management-bubble">
                    <h2>Income</h2>
                    <div className="management-bubble-inner">
                        <p className="coming-soon">Coming soon...</p>
                    </div>
                </div>
            </div>
        </section >
    )
}