import { useState } from "react"
import { Title } from "../../Title"
import '../../../../styles/Management.css'

export function Management() {
    const [businessTag, setBusinessTag] = useState('tagrandom')

    const [primary, setPrimary] = useState('#ADD861')
    const [secondary, setSecondary] = useState('#4D4D4D')
    const [action, setAction] = useState('#D9D9D9')
    const [theme, setTheme] = useState('#F9FbFD')

    const changeColor = (color) => {
        switch (color) {
            case primary:
                return (e) => setPrimary(e.target.value)
            case action:
                return (e) => setAction(e.target.value)
            case secondary:
                return (e) => setSecondary(e.target.value)
            case theme:
                return (e) => setTheme(e.target.value)
            default:
                console.error('Error: Color not found')
        }
    }

    return (
        <section>
            <Title title="Management" text="Management" />
            <div className="management-flex">
                <div className="management-inner">
                    <h2>My business</h2>
                    <p>Manage your business</p>
                    <h3>Name</h3>
                    <p>/{businessTag}</p>
                    <input type="text" value={businessTag} onChange={(e) => setBusinessTag(e.target.value)} />
                    <h3>Style</h3>
                    <p>Change your business colors by tapping on them</p>
                    <div className="management-colors">
                        <div style={{ backgroundColor: primary }}><label htmlFor="change-primary-color">Primary Color</label><input type="color" name="change-primary-color" id="change-primary-color" onChange={changeColor(primary)} /></div>
                        <div style={{ backgroundColor: secondary }}><label htmlFor="change-secondary-color">Secondary Color</label><input type="color" name="change-secondary-color" id="change-secondary-color" onChange={changeColor(secondary)} /></div>
                        <div style={{ backgroundColor: action }}><label htmlFor="change-call-to-action-color">Call to action Color</label><input type="color" name="change-call-to-action-color" id="change-call-to-action-color" onChange={changeColor(action)} /></div>
                        <div style={{ backgroundColor: theme }}><label htmlFor="change-theme-color">Theme Color</label><input type="color" name="change-theme-color" id="change-theme-color" onChange={changeColor(theme)} /></div>
                    </div>
                    <h3>Payment</h3>
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