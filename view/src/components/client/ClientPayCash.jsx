import { useEffect, useState } from "react";
import { GreetHandSVG } from "../../assets/svg/GreetHandSVG.jsx";

export function ClientPayCash({ orderNumber, primaryColor, secondaryColor, themeColor }) {

    return (
        <div className="client-cash-payment">
            <div className="client-cash-payment-title">
                <h3 style={{ color: secondaryColor }}>Grab your order</h3>
                <p style={{ color: secondaryColor }}>*Do not close this page please*</p>
            </div>
            <div className="client-cash-payment-greet">
                <p style={{ color: secondaryColor }}>Tap to notify the cashier</p>
                <button style={{ backgroundColor: secondaryColor }}><GreetHandSVG color={themeColor} /></button>
            </div>
            <div className="client-cash-payment-id">
                <p style={{ color: secondaryColor }}>Your order number:</p>
                <h3 style={{ color: secondaryColor }}>{orderNumber}</h3>
            </div>
        </div>
    )
}