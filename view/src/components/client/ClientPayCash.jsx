import { useEffect, useState } from "react";
import { GreetHandSVG } from "../../assets/svg/GreetHandSVG.jsx";

export function ClientPayCash({ orderNumber }) {

    return (
        <div className="client-cash-payment">
            <div className="client-cash-payment-title">
                <h3>Grab your order</h3>
                <p>*Do not close this page please*</p>
            </div>
            <div className="client-cash-payment-greet">
                <p>Greet</p>
                <button><GreetHandSVG /></button>
            </div>
            <div className="client-cash-payment-id">
                <p>Your order number:</p>
                <h3>{orderNumber}</h3>
            </div>
        </div>
    )
}