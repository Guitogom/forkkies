import "./../styles/Header.css";

export function Header () {
    

    return (
        <header className="business-header">
        <p className="business-name">Ferreteria Lavapies</p>
        <div className="flex">
            <p className="business-type">Ferreteria</p>
            <div className="business-status off">
                <div className="business-status-circle"></div>
                <p className="business-status-text">Offline</p>
                </div>
        </div>
        </header>
    )
}