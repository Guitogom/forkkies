import '../../../../styles/Products.css';
import { PlusSVG } from '../../../../assets/svg/PlusSVG';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../Loading.jsx';
import { StepDisplay } from './StepDisplay.jsx';
import { DeleteSVG } from '../../../../assets/svg/DeleteSVG.jsx';

export function ProductPanel() {
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams()
    const { c_id } = useParams()
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

    const [backgroundImage, setBackgroundImage] = useState('/src/assets/media/camera.webp')
    const [backgroundSize, setBackgroundSize] = useState('60px')

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setBackgroundImage(reader.result)
                setBackgroundSize('cover')
                setProduct({ ...product, image: reader.result.split(',')[1] })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleProductNameChange = (value) => {
        setProduct({ ...product, name: value });
    }

    const handleProductDescriptionChange = (value) => {
        setProduct({ ...product, description: value });
    }

    const handleProductPriceChange = (value) => {
        setProduct({ ...product, price: value });
    }

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

    const [editStep, setEditStep] = useState({})

    const handleEdit = (step) => {
        if (step === 'close') {
            setEdit(false)
        } else {
            setEditStep(step)
            setEdit(true)
        }
    }

    const handleEditStepChange = (fieldName, value) => {
        const updatedSteps = [...product.steps];
        const index = updatedSteps.findIndex((step) => step === editStep);
        if (index !== -1) {
            updatedSteps[index][fieldName] = value;
            setProduct({ ...product, steps: updatedSteps });
        }
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


    // if (!loaded) return <Loading />

    return (
        <div className='product-parent'>
            <div className="edit-step" style={{ top: edit ? '0%' : '-100%' }}>
                <div className="edit-step-inner">
                    <div className="edit-step-upper">
                        <input type="text" placeholder='Step text' value={editStep.title} onInput={(e) => handleEditStepChange('title', e.target.value)} />
                        <div className="step-close" onClick={() => handleEdit('close')}>
                            <PlusSVG />
                        </div>
                    </div>

                </div>
            </div>

            <div className="up-product-column">
                <button className='product-delete'><DeleteSVG /> Delete</button>
                <button className='product-close' onClick={() => window.location.href = `/dashboard/t/${id}/${c_id}/`}><PlusSVG /></button>
            </div>
            <div className="left-product-column">
                <div className="product-basic-info">
                    <div className="image-input" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: `${backgroundSize}` }} >
                        <label htmlFor="categoryImage"></label>
                        <input type="file" name="categoryImage" id="categoryImage" onChange={handleImageChange} />
                    </div>
                    <div className="product-basic-info-2">
                        <input type="text" placeholder='Product Name' value={product.name} onChange={(e) => handleProductNameChange(e.target.value)} />
                        <div className="product-propierties">
                            <PlusSVG />
                        </div>
                    </div>
                </div>
                <textarea onChange={(e) => handleProductDescriptionChange(e.target.value)} value={product.description}></textarea>
                <input type="text" placeholder='00,00€' value={product.price} onChange={(e) => handleProductPriceChange(e.target.value)} />
            </div>
            <div className="right-product-column">
                <div className="steps-panel">
                    <div className="steps-list">
                        {
                            product.steps.length === 0 ? <div className='empty-steps'><p>This product is currently an individual item.</p></div> :
                                product.steps.map((step, index) => {
                                    return (
                                        <StepDisplay className={`step ${index % 2 === 0 ? 'step-even' : 'step-odd'}`} step={step} key={index} setStepType={(newType) => handleStepTypeChange(index, newType)} handleDeleteStep={() => handleStepDelete(index)} handleEdit={() => handleEdit(step)} />
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
        </div >
    )
}