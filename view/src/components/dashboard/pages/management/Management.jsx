import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Title } from "../../Title"
import '../../../../styles/Management.css'

export function Management({ business, businessName, setBusinessName }) {
    const [primary, setPrimary] = useState(business.color1)
    const [secondary, setSecondary] = useState(business.color2)
    const [action, setAction] = useState(business.color3)
    const [theme, setTheme] = useState(business.color4)

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
            .then(response => {
                console.log(response)
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
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error('Error:', error.message)
            })
    }

    const handleLogOut = () => {
        localStorage.removeItem('session_token')
        navigate('/')
    }

    const [tagMessage, setTagMessage] = useState(false)

    const tagClick = () => {
        setTagMessage(true)
        setTimeout(() => {
            setTagMessage(false)
        }, 3000)
    }

    return (
        <section>
            <Title title="Management" text="Management" />
            <div className="management-flex">
                <div className="management-inner">
                    <h2>My business</h2>
                    <p className="management-inner-tag" onClick={tagClick}>/{business.tag} <span style={{ opacity: `${tagMessage ? '1' : '0'}` }}>This is your business tag. It is unique and cannot be changed</span></p>
                    <div className="management-business-name">
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <button onClick={handleChangeName}>Save</button>
                    </div>
                    <h3>Style</h3>
                    <p>Change your business colors by tapping on them</p>
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
                            <label htmlFor="change-theme-color">Theme Color</label>
                            <input type="color" name="change-theme-color" id="change-theme-color" value={theme} onChange={(e) => setTheme(e.target.value)} />
                        </div>
                    </div>
                    <button onClick={handleLogOut} className="management-log-out-button">Log out <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 7.63636L14 4.5C14 4.22386 13.7761 4 13.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 19.5C4 19.7761 4.22386 20 4.5 20L13.5 20C13.7761 20 14 19.7761 14 19.5L14 16.3636" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                </div>
                <div className="management-inner">
                    {/* <h2>Credentials</h2>
                    <p>Manage your credentials</p>
                    <h3>Business account</h3>
                    <label htmlFor="new-password">Introduce New Password: </label>
                    <input type="password" id="new-password" />
                    <label htmlFor="repeat-new-password">Repeat New Password: </label>
                    <input type="password" id="repeat-new-password" /> */}
                </div>
            </div>
        </section>
    )
}