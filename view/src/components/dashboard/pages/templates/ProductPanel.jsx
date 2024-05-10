import '../../../../styles/Products.css';
import { PlusSVG } from '../../../../assets/svg/PlusSVG';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../Loading.jsx';
import { StepDisplay } from './StepDisplay.jsx';

export function ProductPanel() {
    const [loaded, setLoaded] = useState(false)
    const [edit, setEdit] = useState(false)
    const [product, setProduct] = useState({
        id: '',
        name: 'hamburguesa',
        description: 'bla bla',
        price: '10.99',
        image: 'img',
        steps: [
            {
                id: '',
                title: 'Que tipo de carne quieres?',
                type: '1',
                specials: [
                    {
                        id: '',
                        name: 'Ternera',
                        price_changer: '0',
                        img: 'img'
                    }
                ]
            },
            {
                id: '',
                title: 'Añade tus condimentos',
                type: '3',
                specials: [
                    {
                        id: '',
                        name: 'Ketchup',
                        price_changer: '0.50',
                        img: 'img'
                    },
                    {
                        id: '',
                        name: 'Mostaza',
                        price_changer: '0.50',
                        img: 'img'
                    }
                ]
            },
            {
                id: '',
                title: 'Añade tus condimentos',
                type: '3',
                specials: [
                    {
                        id: '',
                        name: 'Ketchup',
                        price_changer: '0.50',
                        img: 'img'
                    },
                    {
                        id: '',
                        name: 'Mostaza',
                        price_changer: '0.50',
                        img: 'img'
                    }
                ]
            },
            {
                id: '',
                title: 'Añade tus condimentos',
                type: '2',
                specials: [
                    {
                        id: '',
                        name: 'Ketchup',
                        price_changer: '0.50',
                        img: 'img'
                    },
                    {
                        id: '',
                        name: 'Mostaza',
                        price_changer: '0.50',
                        img: 'img'
                    }
                ]
            }
        ]
    })

    const handleStepTypeChange = (stepIndex, newType) => {
        const updatedSteps = [...product.steps]
        updatedSteps[stepIndex].type = newType
        setProduct({ ...product, steps: updatedSteps })
    }

    const handleStepDelete = (stepIndex) => {
        const updatedSteps = [...product.steps]
        updatedSteps.splice(stepIndex, 1)
        setProduct({ ...product, steps: updatedSteps })
    }

    const handleEdit = () => {
        setEdit(!edit)
    }

    const addNewStep = () => {
        const updatedSteps = [...product.steps]
        updatedSteps.push({
            id: '',
            title: 'New Step',
            type: '1',
            specials: []
        })
        setProduct({ ...product, steps: updatedSteps })
    }

    useEffect(() => {
        console.log(product)
    }, [product])


    // if (!loaded) return <Loading />

    return (
        <div className='product-parent'>
            <div className="edit-step" style={{ top: edit ? '0%' : '-100%' }}>
                <div className="edit-step-inner">
                    <div className="edit-step-upper">
                        <input type="text" placeholder='Step Name' />
                        <div className="step-close" onClick={handleEdit}>
                            <PlusSVG />
                        </div>
                    </div>
                </div>
            </div>


            <div className="left-product-column">
                <button>Delete</button>
                <div className="product-basic-info">
                    <div className="image-input" >
                        <label htmlFor="categoryImage"></label>
                        <input type="file" name="categoryImage" id="categoryImage" />
                    </div>
                    <div className="product-basic-info-2">
                        <input type="text" placeholder='Product Name' />
                        <div className="product-propierties">
                            <PlusSVG />
                        </div>
                    </div>
                </div>
                <p>Long but not too long product description for this amazing product</p>
                <input type="text" placeholder='00,00€' />
            </div>
            <div className="right-product-column">
                <div className="steps-panel">
                    <div className="steps-list">
                        {
                            product.steps.length === 0 ? <div className='empty-steps'><p>This product is currently an individual item.</p></div> :
                                product.steps.map((step, index) => {
                                    return (
                                        <StepDisplay className={`step ${index % 2 === 0 ? 'step-even' : 'step-odd'}`} step={step} key={index} setStepType={(newType) => handleStepTypeChange(index, newType)} handleDeleteStep={() => handleStepDelete(index)} handleEdit={handleEdit} />
                                    )
                                })
                        }
                    </div>
                    <div className="steps-add" onClick={addNewStep}>
                        <PlusSVG />
                    </div>
                </div>
            </div>
            <div className="down-product-column">
                <button>Save</button>
            </div>
        </div>
    )
}