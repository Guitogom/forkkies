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
                <li title='Management' className={location.pathname.includes('/management') ? 'selected' : ''}><Link to="/dashboard/management"><ManagementSVG /></Link></li>
                <li title='Templates' className={location.pathname.includes('/templates') || location.pathname.includes('/t') ? 'selected' : ''}><Link to="/dashboard/templates"><ProductsSVG /></Link></li>
                <li title='Home' className={location.pathname !== '/dashboard' ? '' : 'selected'}><Link to="/dashboard"><HomeSVG /></Link></li>
                <li title='Orders' className={location.pathname.includes('/orders') ? 'selected' : ''}><Link to="/dashboard/orders"><OrdersSVG /></Link></li>
                <li title='Analytics' className={location.pathname.includes('/analytics') ? 'selected' : ''}><Link to="/dashboard/analytics"><AnalyticsSVG /></Link></li>
            </ul>
        </nav>
    )
}
