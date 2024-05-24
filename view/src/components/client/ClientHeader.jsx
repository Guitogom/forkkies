import { useNavigate, useParams } from "react-router-dom"

export function ClientHeader({ display, setDisplay, name, primaryColor, secondaryColor, callToActionColor, themeColor }) {
    const { tag } = useParams()
    const navigate = useNavigate()

    const onPayment = window.location.pathname.includes(`/b/${tag}/pay/`)

    const toggleDisplay = () => {
        setDisplay(!display)
    }

    const mainMenu = () => {
        navigate(`/b/${tag}/categories`)
    }

    return (
        <header className='client-header' style={{
            background: `linear-gradient(90deg, ${secondaryColor} 0%, ${secondaryColor} 44%, ${primaryColor} 98%)`
        }}>
            <div className="client-nav" onClick={toggleDisplay} style={{ opacity: `${onPayment ? '0' : '1'}`, pointerEvents: `${onPayment ? 'none' : 'auto'}` }}>
                {
                    display ?
                        <svg fill={themeColor} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z"></path></g></svg>
                        :
                        <svg fill={themeColor} viewBox="0 -2 28 28" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m2.61 0h22.431c1.441 0 2.61 1.168 2.61 2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441 0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"></path><path d="m2.61 9.39h22.431c1.441 0 2.61 1.168 2.61 2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441 0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"></path><path d="m2.61 18.781h22.431c1.441 0 2.61 1.168 2.61 2.61s-1.168 2.61-2.61 2.61h-22.431c-1.441 0-2.61-1.168-2.61-2.61s1.168-2.61 2.61-2.61z"></path></g></svg>
                }
            </div>
            <div className="client-title">
                <h1 style={{ color: themeColor }} onClick={mainMenu}>{name}</h1>
            </div>
        </header>
    )
}
