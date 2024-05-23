import { PlaySVG } from "../../../../assets/svg/PlaySVG.jsx"
import { useState } from 'react'

export function OrderProp({ order }) {
    const date = new Date(order.date).toLocaleDateString()
    const [open, setOpen] = useState(false)

    return (
        <div className="order-prop">
            <p>#{order.id}</p>
            <p>{date}</p>
            <p>{order.name}</p>
            <p>{order.total}</p>
            <button>{order.status}</button>
            <button onClick={() => setOpen(!open)}><PlaySVG rotation={open ? '90deg' : '0deg'} /></button>
        </div>
    )
}
