import { useState } from "react"
import { Title } from "../../Title.jsx"
import '../../../../styles/Categories.css'
import { PlusSVG } from "../../../../assets/svg/PlusSVG.jsx"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Loading } from '../../Loading.jsx'


export function Category() {
    const { id } = useParams()
    const [categoryName, setCategoryName] = useState('New Category')
    const [category, setCategory] = useState([])

    const changeCategoryName = () => {
        console.log('Change name')
    }

    const handleCategoryDelete = () => {
        console.log('Delete category')
    }

    const handleCreateProduct = () => {
        console.log('Create product')
    }



    return (
        <section>
            <div className="notification">

            </div>

            <Title title="Templates" text={`${categoryName}`} />
            <div className="template-options">
                <Link className="template-goback-button" to={`/dashboard/t/${id}`}>Go Back</Link>
                <div className="template-options-div">
                    <button className="template-name-button" onClick={changeCategoryName}>Change Name</button>
                    <button className="template-delete-button" onClick={handleCategoryDelete}>Delete Category</button></div>
            </div>
            <div className="categories-add" onClick={handleCreateProduct}><PlusSVG /></div>
            <div className="categories">
                {
                    category.length === 0 ? <p>No categories yet</p> :
                        products.map((product, index) => {
                            return (
                                <ProductDisplay key={index} category={product} />
                            )
                        })
                }
            </div>
        </section>
    )
}