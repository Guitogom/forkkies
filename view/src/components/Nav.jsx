import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

/* SVGs */
import { ManagementSVG } from '../assets/svg/ManagementSVG.jsx'
import { ProductsSVG } from '../assets/svg/ProductsSVG.jsx'
import { HomeSVG } from '../assets/svg/HomeSVG.jsx'
import { OrdersSVG } from '../assets/svg/OrdersSVG.jsx'
import { AnalyticsSVG } from '../assets/svg/AnalyticsSVG.jsx'

export function Nav () {
    return (
        <nav className="business-nav">
            <ul>
                <li title='Management'><Link to="/management"><ManagementSVG /></Link></li>
                <li title='Products'><Link to="/products"><ProductsSVG /></Link></li>
                <li title='Home'><Link to="/"><HomeSVG /></Link></li>
                <li title='Orders'><Link to="/orders"><OrdersSVG /></Link></li>
                <li title='Analytics'><Link to="/analytics"><AnalyticsSVG /></Link></li>
            </ul>
        </nav>
    )
}
