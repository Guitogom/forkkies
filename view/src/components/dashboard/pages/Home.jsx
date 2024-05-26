import { useRef } from 'react'
import { Title } from "../Title"
import '../../../styles/Home.css'
import businessQR from '../../../assets/media/example_qr.png'
import { Link } from 'react-router-dom'
import { QRCode } from 'react-qrcode-logo'

import { ManagementSVG } from '../../../assets/svg/ManagementSVG'
import { ProductsSVG } from '../../../assets/svg/ProductsSVG'
import { OrdersSVG } from "../../../assets/svg/OrdersSVG"
import { AnalyticsSVG } from "../../../assets/svg/AnalyticsSVG"

import LogoImage from '../../../assets/media/logo.png'

export function Home({ business, setBusiness, primaryColor }) {

    const canvasRef = useRef(null);

    const handleDownload = () => {
        const canvas = canvasRef.current.querySelector('canvas');
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = `${business.tag}Qr.png`;
        link.click();
    }


    return (
        <section>
            <Title title="Home" text="Home" />
            <div className="body-home">
                <aside className="left-home">
                    <Link to="/dashboard/management" className="box"><ManagementSVG /><h2>Management</h2></Link>
                    <Link to="/dashboard/templates" className="box"><ProductsSVG /><h2>Templates</h2></Link>
                    <Link to="/dashboard/orders" className="box"><OrdersSVG /><h2>Orders</h2></Link>
                    <Link to="/dashboard/analytics" className="box"><AnalyticsSVG /><h2>Analytics</h2></Link>
                </aside>
                <aside className="right-home">
                    <p className="uppertext">Click the QR to download</p>
                    <div ref={canvasRef} onClick={handleDownload}>
                        <QRCode value={`https://forkkies.live/b/${business.tag}`} ecLevel="H" size='250' logoWidth='100' logoHeight='100' logoOpacity='0.5' qrStyle="dots" eyeRadius={10} bgColor="transparent" />
                    </div>
                    <p className="undertext">Scan to preview</p>
                    {/* <button>Download</button> */}
                </aside>
            </div>
        </section>
    )
}