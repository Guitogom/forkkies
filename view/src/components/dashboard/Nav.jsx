import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './../../styles/Nav.css'

/* SVGs */
import { ManagementSVG } from '../../assets/svg/ManagementSVG.jsx'
import { ProductsSVG } from '../../assets/svg/ProductsSVG.jsx'
import { HomeSVG } from '../../assets/svg/HomeSVG.jsx'
import { OrdersSVG } from '../../assets/svg/OrdersSVG.jsx'
import { AnalyticsSVG } from '../../assets/svg/AnalyticsSVG.jsx'

export function Nav() {
    const location = useLocation();

    return (
        <nav className="business-nav">
            <ul>
                <li title='Management' className={location.pathname === '/management' ? 'selected' : ''}><Link to="/management"><ManagementSVG /></Link></li>
                <li title='Products' className={location.pathname === '/products' ? 'selected' : ''}><Link to="/products"><ProductsSVG /></Link></li>
                <li title='Home' className={location.pathname !== '/' ? '' : 'selected'}><Link to="/"><HomeSVG /></Link></li>
                <li title='Orders' className={location.pathname === '/orders' ? 'selected' : ''}><Link to="/orders"><OrdersSVG /></Link></li>
                <li title='Analytics' className={location.pathname === '/analytics' ? 'selected' : ''}><Link to="/analytics"><AnalyticsSVG /></Link></li>
            </ul>
        </nav>
    )
}
