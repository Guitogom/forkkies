import { useEffect, useState } from "react"
import { Title } from "../../Title"
import '../../../../styles/Management.css'

export function Management({ business, businessName, setBusinessName }) {

    console.log(business)
    const [primary, setPrimary] = useState(business.color1)
    const [secondary, setSecondary] = useState(business.color2)
    const [action, setAction] = useState(business.color3)
    const [theme, setTheme] = useState(business.color4)

    const changeColor = (color) => {
        const token = localStorage.getItem('session_token')
        switch (color) {
            case primary:
                (e) => setPrimary(e.target.value)
                fetch('https://api.forkkies.live/modifybusiness', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ color1: primary })
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
            case action:
                (e) => setAction(e.target.value)
                fetch('https://api.forkkies.live/modifybusiness', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ color2: secondary })
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
            case secondary:
                (e) => setSecondary(e.target.value)
                fetch('https://api.forkkies.live/modifybusiness', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ color3: action })
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
            case theme:
                (e) => setTheme(e.target.value)
                fetch('https://api.forkkies.live/modifybusiness', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ color4: theme })
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
            default:
                console.error('Error: Color not found')
        }
    }

    const handleChangeName = async (e) => {
        const token = localStorage.getItem('session_token')
        setBusinessName(e.target.value)
        fetch('https://api.forkkies.live/modifybusiness', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: businessName })
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
                        <div style={{ backgroundColor: primary }}><label htmlFor="change-primary-color">Primary Color</label><input type="color" name="change-primary-color" id="change-primary-color" onChange={changeColor(primary)} /></div>
                        <div style={{ backgroundColor: secondary }}><label htmlFor="change-secondary-color">Secondary Color</label><input type="color" name="change-secondary-color" id="change-secondary-color" onChange={changeColor(secondary)} /></div>
                        <div style={{ backgroundColor: action }}><label htmlFor="change-call-to-action-color">Call to action Color</label><input type="color" name="change-call-to-action-color" id="change-call-to-action-color" onChange={changeColor(action)} /></div>
                        <div style={{ backgroundColor: theme }}><label htmlFor="change-theme-color">Theme Color</label><input type="color" name="change-theme-color" id="change-theme-color" onChange={changeColor(theme)} /></div>
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