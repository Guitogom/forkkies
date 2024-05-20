import { Link, useParams } from 'react-router-dom'
import { ClientDisplayMenuCategory } from './props/ClientDisplayMenuCategory.jsx'

export function ClientDisplayMenu({ displayNav, setDisplayNav, primaryColor, themeColor, categories }) {
    const { tag } = useParams()

    return (
        <section className="client-display-menu" style={{ width: displayNav ? '100%' : '0px', backgroundColor: themeColor }}>
            <div className="client-nav-list">
                {
                    categories && categories.length > 0 && categories.map((category, index) => (
                        category.products.length > 0 && (
                            <ClientDisplayMenuCategory key={index} category={category} primaryColor={primaryColor} setDisplayNav={setDisplayNav} displayNav={displayNav} />)
                    ))
                }
            </div>
        </section>
    )
}