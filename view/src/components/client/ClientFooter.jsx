import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function ClientFooter({ primaryColor, secondaryColor, callToActionColor, themeColor, orderPrice }) {
    const { tag } = useParams()
    const [onOrder, setOnOrder] = useState(window.location.pathname.includes(`/b/${tag}/order`) ? true : false)

    useEffect(() => {
        setOnOrder(window.location.pathname.includes(`/b/${tag}/order`) ? true : false)
    }, [window.location.pathname])

    const formatPrice = (price) => {
        return price % 1 === 0 ? `${price}.00` : price.toFixed(2)
    }

    const navigate = useNavigate()

    const handleClick = () => {
        if (onOrder) {
            navigate(`/b/${tag}/pay`)
        } else {
            navigate(`/b/${tag}/order`)
        }
    }

    const orderButton = (
        <button className="client-order" onClick={handleClick} style={{ backgroundColor: secondaryColor, color: themeColor }}>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill={themeColor} stroke="#000000">
                <path fill={themeColor} d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path>
            </svg> Order
        </button>
    )

    const payButton = (
        <button className="client-order" onClick={() => navigate(`/b/${tag}/pay`)} style={{ backgroundColor: secondaryColor, color: themeColor }}>
            <svg fill={themeColor} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-2 9h-2v-4h2v4zM5 7a1.001 1.001 0 0 1 0-2h13v2H5z"></path></g></svg>
            Pay
        </button>
    )

    return (
        <footer className="client-footer" style={{ backgroundColor: primaryColor }}>
            <p className="client-show-price" style={{ color: themeColor }}>
                {formatPrice(orderPrice)}€
            </p>
            {onOrder ? payButton : orderButton}
        </footer>
    )
}
