import '../../styles/Title.css'

import { ManagementSVG } from '../../assets/svg/ManagementSVG'
import { ProductsSVG } from '../../assets/svg/ProductsSVG'
import { HomeSVG } from "../../assets/svg/HomeSVG"
import { OrdersSVG } from "../../assets/svg/OrdersSVG"
import { AnalyticsSVG } from "../../assets/svg/AnalyticsSVG"


export function Title({ title }) {
    const titleLower = title.toLowerCase();
    switch (titleLower) {
        case 'management':
            return (
                <div className="title-parent">
                    <ManagementSVG />
                    <h2 className="title">Management</h2>
                </div>
            )
        case 'products':
            return (
                <div className="title-parent">
                    <ProductsSVG />
                    <h2 className="title">Products</h2>
                </div>
            )
        case 'home':
            return (
                <div className="title-parent">
                    <HomeSVG />
                    <h2 className="title">Home</h2>
                </div>
            )
        case 'orders':
            return (
                <div className="title-parent">
                    <OrdersSVG />
                    <h2 className="title">Orders</h2>
                </div>
            )
        case 'analytics':
            return (
                <div className="title-parent">
                    <AnalyticsSVG />
                    <h2 className="title">Analytics</h2>
                </div>
            )
        default:
            return (
                <div className="title-parent">
                    <HomeSVG />
                    <h2 className="title">Home</h2>
                </div>
            )
    }
}