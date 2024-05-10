import '../../../../styles/Products.css';
import { PlusSVG } from '../../../../assets/svg/PlusSVG';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../Loading.jsx';
import { StepDisplay } from './StepDisplay.jsx';
import { DeleteSVG } from '../../../../assets/svg/DeleteSVG.jsx';
import { SpecialDisplay } from './SprecialDisplay.jsx';

export function ProductPanel() {
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams()
    const { c_id } = useParams()
    const { p_id } = useParams()
    const [edit, setEdit] = useState(false)
    const [product, setProduct] = useState({
        id: '',
        name: '',
        desc: '',
        price: '',
        img: '',
        steps: []
    })

    useEffect(() => {
        if (p_id !== 'new' && !loaded) {
            const token = localStorage.getItem('session_token')
            fetch(`http://147.182.207.78:3000/getproduct?id=${p_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    clearTimeout(timeout)
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    return response.json()
                })
                .then(response => {
                    setProduct(response.result.product)
                    setBackgroundImage(`data:image/jpeg;base64,${response.result.product.img}`)
                    setBackgroundSize('cover')
                    setImageAEnviar(response.result.product.img)
                    setLoaded(true)
                    console.log(response)
                })
                .catch(error => {
                    clearTimeout(timeout)
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })
        } else {
            setLoaded(true)
        }
    }, [])

    const [backgroundImage, setBackgroundImage] = useState('/src/assets/media/camera.webp')
    const [backgroundSize, setBackgroundSize] = useState('60px')

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setBackgroundImage(reader.result)
                setBackgroundSize('cover')
                setProduct({ ...product, img: reader.result.split(',')[1] })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleProductNameChange = (value) => {
        setProduct({ ...product, name: value });
    }

    const handleProductDescriptionChange = (value) => {
        setProduct({ ...product, desc: value });
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

    const saveProduct = () => {
        const token = localStorage.getItem('session_token')
        fetch(`http://147.182.207.78:3000/modifyproduct`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category_id: c_id, product: product })
        })
            .then(response => {
                clearTimeout(timeout)
                if (!response.ok) {
                    window.location.href = '/error'
                } else {
                    window.location.href = `/dashboard/t/${id}/${c_id}`
                }
            })
            .catch(error => {
                clearTimeout(timeout)
                console.error('Error:', error.message)
                window.location.href = '/error'
            })

    }




    if (!loaded) return <Loading />

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
                    <div className="edit-step-lower">
                        {editStep && editStep.specials && editStep.specials.length > 0 ? (
                            editStep.specials.map((special, index) => (
                                <SpecialDisplay special={special} key={index} />
                            ))
                        ) : (
                            <div className='empty-steps'><p>This product has currently no items.</p></div>
                        )}
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
                <textarea onChange={(e) => handleProductDescriptionChange(e.target.value)} value={product.desc}></textarea>
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
                <button onClick={saveProduct}>Save</button>
            </div>
        </div >
    )
}