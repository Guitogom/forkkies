import { useEffect, useState } from "react"
import { Title } from "../../Title"
import '../../../../styles/Management.css'

export function Management({ business, businessName, setBusinessName }) {
    const [primary, setPrimary] = useState(business.color1)
    const [secondary, setSecondary] = useState(business.color2)
    const [action, setAction] = useState(business.color3)
    const [theme, setTheme] = useState(business.color4)

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

    const handleChangeName = async (e) => {
        const newName = e.target.value
        setBusinessName(newName)

        const debouncedUpdateName = setTimeout(() => {
            updateName(newName)
        }, 2000)

        return () => clearTimeout(debouncedUpdateName)
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
        window.location.href = '/'
    }

    return (
        <section>
            <Title title="Management" text="Management" />
            <div className="management-flex">
                <div className="management-inner">
                    <h2>My business</h2>
                    <p>Manage your business</p>
                    <h3>Name</h3>
                    <p>/{business.tag}</p>
                    <input type="text" value={businessName} onChange={handleChangeName} />
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
                        <div style={{ backgroundColor: action }}>
                            <label htmlFor="change-call-to-action-color">Call to Action Color</label>
                            <input type="color" name="change-call-to-action-color" id="change-call-to-action-color" value={action} onChange={(e) => setAction(e.target.value)} />
                        </div>
                        <div style={{ backgroundColor: theme }}>
                            <label htmlFor="change-theme-color">Theme Color</label>
                            <input type="color" name="change-theme-color" id="change-theme-color" value={theme} onChange={(e) => setTheme(e.target.value)} />
                        </div>
                    </div>
                    <h3>Payment</h3>
                    <h3>Business</h3>
                    <button onClick={handleLogOut}>Log out</button>
                </div>
                <div className="management-inner">
                    <h2>Credentials</h2>
                    <p>Manage your credentials</p>
                    <h3>Business account</h3>
                    <label htmlFor="new-password">Introduce New Password: </label>
                    <input type="password" id="new-password" />
                    <label htmlFor="repeat-new-password">Repeat New Password: </label>
                    <input type="password" id="repeat-new-password" />
                </div>
            </div>
        </section>
    )
}