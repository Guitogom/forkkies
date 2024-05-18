import { useParams, Link } from "react-router-dom";
import { useState, useRef } from "react";
import { ClientProductProp } from "./props/ClientProductProp.jsx"
import ScrollHandler from "./ScrollHandler.jsx";

export function ClientProducts({ categories, secondaryColor }) {
    const [divHeight, setDivHeight] = useState('150px')
    const { categoryId, tag } = useParams()
    const category = categories.find(cat => cat.id === parseInt(categoryId))
    const clientProductsRef = useRef(null);

    if (!category) {
        return <div>Category not found</div>
    }

    return (
        <section>
            <div className="client-products-categories" style={{ boxShadow: divHeight === '0px' ? 'none' : `0 -5px 15px ${secondaryColor}`, height: `${divHeight}`, opacity: divHeight === '0px' ? '0' : '1' }}>
                {
                    categories && categories.length > 0 ? (
                        categories.map((category, index) => (
                            <Link to={`/b/${tag}/c/${category.id}`} className="client-products-category-prop" key={index}>
                                <img src={`data:image/jpeg;base64,${category.img}`} alt={category.name} className="category-products-prop-img" />
                                <h3 className="category-products-prop-name" style={{ color: secondaryColor }}>{category.name}</h3>
                            </Link>
                        ))
                    ) : null
                }
            </div>
            <h2 className="client-products-category-name" style={{ color: `${secondaryColor}` }}>{category.name}</h2>
            <div className="client-products" ref={clientProductsRef}>
                <ScrollHandler divHeight={divHeight} setDivHeight={setDivHeight} targetRef={clientProductsRef} />
                {category.products && category.products.length > 0 ? (
                    category.products.map((product, index) => (
                        <ClientProductProp key={index} product={product} secondaryColor={secondaryColor} />
                    ))
                ) : (
                    <div className="client-category-prop">
                        <img src='https://www.shareicon.net/data/512x512/2015/12/01/680732_sign_512x512.png' alt='No products' className="category-prop-img" style={{ opacity: 0.5, width: '60%' }} />
                        <h3 className="category-prop-name" style={{ color: secondaryColor }}>No products available</h3>
                    </div>
                )}
            </div>
        </section>
    )
}