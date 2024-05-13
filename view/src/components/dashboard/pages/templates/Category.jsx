import { useState, useEffect } from "react"
import { Title } from "../../Title.jsx"
import '../../../../styles/Categories.css'
import { PlusSVG } from "../../../../assets/svg/PlusSVG.jsx"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Loading } from '../../Loading.jsx'
import { ProductDisplay } from './ProductDisplay.jsx'


export function Category() {
    const [loaded, setLoaded] = useState(false)
    const { id, c_id } = useParams()
    const [categoryName, setCategoryName] = useState('')
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])

    const modifyCategory = () => {
        window.location.href = `/dashboard/t/${id}/cp/${c_id}`
    }

    const handleCategoryDelete = () => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            fetch('http://147.182.207.78:3000/modifycategory', {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ template_id: id, category: { id: c_id, delete: true } })
            })
                .then(response => {
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    window.location.href = `/dashboard/t/${id}`
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })
        }
    }

    const handleCreateProduct = () => {
        window.location.href = `/dashboard/t/${id}/${c_id}/pp/new`
    }

    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            fetch(`http://147.182.207.78:3000/getcategory?id=${c_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    return response.json()
                })
                .then(response => {
                    setCategory(response.result)
                    setCategoryName(response.result.category.name)
                    setProducts(response.result.products) // Falta el precio
                    setLoaded(true)
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })
        }
    }, [])

    if (!loaded) return <Loading />

    return (
        <section>
            <div className="notification">

            </div>

            <Title title="Templates" text={`${categoryName}`} />
            <div className="template-options">
                <button className="template-name-button" onClick={modifyCategory}>Modify Category</button>
                <div className="template-options-div">
                    <button className="template-delete-button" onClick={handleCategoryDelete}>Delete Category</button>
                    <Link className="template-goback-button" to={`/dashboard/t/${id}`}>Go Back</Link></div>
            </div>
            <div className="categories-add" onClick={handleCreateProduct}><PlusSVG /></div>
            <div className="products-grid">
                {
                    category.length === 0 ? <p>No products yet</p> :
                        products.map((product, index) => {
                            return (
                                <ProductDisplay key={index} product={product} />
                            )
                        })
                }
            </div>
        </section>
    )
}