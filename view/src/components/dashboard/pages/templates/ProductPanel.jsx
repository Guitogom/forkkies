import '../../../../styles/Products.css'
import { PlusSVG } from '../../../../assets/svg/PlusSVG'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loading } from '../../Loading.jsx'
import { StepDisplay } from './StepDisplay.jsx'
import { DeleteSVG } from '../../../../assets/svg/DeleteSVG.jsx'
import { SpecialDisplay } from './SpecialDisplay.jsx'
import { LoadingWithText } from '../../LoadingWithText.jsx'
import cameraImage from '/src/assets/media/camera.webp'

export function ProductPanel({ business }) {
    const [loaded, setLoaded] = useState(false)
    const [loading2, setLoading2] = useState(true)
    const { id } = useParams()
    const { c_id } = useParams()
    const { p_id } = useParams()
    const [edit, setEdit] = useState(false)
    const [addProperty, setAddProperty] = useState(false)

    const [properties, setProperties] = useState(business.properties || [])

    const [imageError, setImageError] = useState(false)
    const [nameError, setNameError] = useState('')
    const [priceError, setPriceError] = useState('')

    const navigate = useNavigate()

    const [product, setProduct] = useState({
        id: '',
        name: '',
        desc: '',
        price: '',
        img: '',
        steps: []
    })

    const [lastPrice, setLastPrice] = useState(0)

    useEffect(() => {
        if (p_id !== 'new' && !loaded) {
            const token = localStorage.getItem('session_token')
            fetch(`https://api.forkkies.live/getproduct?id=${p_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        window.location.href + '/error'
                    }
                    return response.json()
                })
                .then(response => {
                    setProduct(response.result.product)
                    setBackgroundImage(`data:image/jpeg;base64,${response.result.product.img}`)
                    setBackgroundSize('cover')
                    setLoaded(true)
                    console.log(response)
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    window.location.href + '/error'
                })
        } else {
            setLoaded(true)
        }
    }, [])

    const [backgroundImage, setBackgroundImage] = useState(cameraImage)
    const [backgroundSize, setBackgroundSize] = useState('60px')

    const handleImageChange = (e) => {
        setImageError(false)
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
        setNameError('')
        setProduct({ ...product, name: value });
    }

    const handleProductDescriptionChange = (value) => {
        setProduct({ ...product, desc: value });
    }

    const handleProductPriceChange = (value) => {
        setPriceError('')

        const numericValue = value.replace(/[^0-9.]/g, '')

        if (numericValue.includes(',')) {
            numericValue.replace(',', '.')
        }

        setLastPrice(numericValue)
        setProduct({ ...product, price: numericValue })
    }

    const handleStepTypeChange = (stepIndex, newType) => {
        const updatedSteps = [...product.steps]
        updatedSteps[stepIndex].type = newType
        setProduct({ ...product, steps: updatedSteps })
    }

    const addNewStep = () => {
        const updatedSteps = [...product.steps]
        const newStepId = `step_${Date.now()}`;
        updatedSteps.push({
            id: newStepId,
            title: 'New Step',
            type: '1',
            specials: []
        })
        setProduct({ ...product, steps: updatedSteps })
    }

    const addStepItem = () => {
        const updatedSteps = [...product.steps]
        const index = updatedSteps.findIndex((step) => step === editStep)
        if (index !== -1) {
            updatedSteps[index].specials.push({
                id: `item_${Date.now()}`,
                name: 'New Item',
                price_changer: '',
                img: ''
            })
            setProduct({ ...product, steps: updatedSteps })
        }
    }

    const handleStepDelete = (stepIndex) => {
        const updatedSteps = [...product.steps]
        updatedSteps.splice(stepIndex, 1)
        setProduct({ ...product, steps: updatedSteps })
    }

    const handleSpecialDelete = (stepId, specialId) => {
        const updatedSteps = product.steps.map(step => {
            if (step.id === stepId) {
                return {
                    ...step,
                    specials: step.specials.filter(special => special.id !== specialId)
                }
            }
            return step
        })

        setProduct({ ...product, steps: updatedSteps })

        if (editStep && editStep.id === stepId) {
            const updatedEditStep = {
                ...editStep,
                specials: editStep.specials.filter(special => special.id !== specialId)
            }
            setEditStep(updatedEditStep)
        }
    }


    const [editStep, setEditStep] = useState({})

    const handleEdit = async (step) => {
        if (step === 'close') {
            setEdit(false)
            setEditStep({})
        } else {
            await setEditStep(step)
            setEdit(true)
        }
    }

    const toggleAddPropertyMenu = () => {
        setAddProperty(!addProperty);
    }

    const handleEditStepChange = (fieldName, value) => {
        const updatedSteps = [...product.steps]
        const index = updatedSteps.findIndex((step) => step === editStep)
        if (index !== -1) {
            updatedSteps[index][fieldName] = value
            setProduct({ ...product, steps: updatedSteps })
        }
    }



    const handleDeleteProduct = () => {
        const token = localStorage.getItem('session_token')
        setLoading2(false)
        fetch(`https://api.forkkies.live/modifyproduct`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category_id: c_id, product: { id: p_id, delete: true } })
        })
            .then(response => {
                if (!response.ok) {
                    window.location.href + '/error'
                } else {
                    setLoading2(true)
                    window.location.href = `/dashboard/t/${id}/${c_id}`
                }
            })
            .catch(error => {
                setLoading2(true)
                console.error('Error:', error.message)
            })
    }

    const saveProduct = () => {
        if (!product.name) {
            setNameError('Product name is required')
            return
        }

        if (!product.price) {
            setPriceError('Product price is required')
            return
        }

        const priceString = product.price.toString()

        if (priceString.split('.').length > 2 || priceString.split('.').length === 2 && priceString.split('.')[1].length > 2) {
            setPriceError('Product price is not correctly formatted')
            return
        }

        const propertyIds = product.properties.map(property => property.id) || []

        const token = localStorage.getItem('session_token')
        setLoading2(false)
        fetch(`https://api.forkkies.live/modifyproduct`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category_id: c_id, product: { ...product, properties: propertyIds } })
        })
            .then(response => {
                if (!response.ok) {
                    window.location.href + '/error'
                } else {
                    setLoading2(true)
                    window.location.href = `/dashboard/t/${id}/${c_id}`
                }
            })
            .catch(error => {
                setLoading2(true)
                setImageError(true)
                console.error('Error:', error.message)
            })
    }

    const deletePropertyFromProduct = (id) => {
        let updatedProperties = product.properties.filter(property => property.id !== id)
        setProduct({ ...product, properties: updatedProperties })
    }


    const addPropertyToProduct = (id) => {
        const propertyExists = product.properties.some(property => property.id === id)
        if (!propertyExists) {
            const property = properties.find(property => property.id === id)
            if (property) {
                let updatedProperties = [...product.properties, property]
                setProduct({ ...product, properties: updatedProperties })
            }
        }
    }

    if (!loading2) return <LoadingWithText />
    if (!loaded) return <Loading />

    return (
        <div className='product-parent'>

            <div className="edit-step" style={{ top: edit ? '0%' : '-100%' }}>
                <div className="edit-step-inner">
                    <div className="edit-step-upper">
                        <input type="text" placeholder='Step text' value={editStep.title || ''} onInput={(e) => handleEditStepChange('title', e.target.value)} className='special-title-input' />
                        <div className="step-close" onClick={() => handleEdit('close')}>
                            <PlusSVG />
                        </div>
                    </div>
                    <div className="edit-step-lower">
                        {editStep && editStep.specials && editStep.specials.length > 0 ? (
                            editStep.specials.map((special) => (
                                <SpecialDisplay
                                    special={special}
                                    key={special.id}
                                    onDelete={() => handleSpecialDelete(editStep.id, special.id)}
                                />
                            ))
                        ) : (
                            <div className='empty-steps'></div>
                        )}
                        <div className="special-item-add" onClick={addStepItem}>
                            <PlusSVG />
                        </div>
                    </div>
                </div>
            </div>

            <div className="edit-properties" style={{ top: addProperty ? '0%' : '-100%' }}>
                <div className="edit-properties-inner">
                    <div className="edit-properties-upper">
                        <p>Add Properties</p>
                        <div className="properties-close" onClick={toggleAddPropertyMenu}>
                            <PlusSVG />
                        </div>
                    </div>
                    <div className="edit-properties-lower">
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <div className={`property-add-image ${product.properties.some(p => p.id === property.id) ? 'added' : ''}`} key={property.id} onClick={() => {
                                    if (product.properties.some(p => p.id === property.id)) {
                                        deletePropertyFromProduct(property.id);
                                    } else {
                                        addPropertyToProduct(property.id);
                                    }
                                }}>
                                    <img src={`data:image/png;base64,${property.img}`} alt={property.id} />
                                </div>

                            ))
                        ) : (
                            <div className='empty-steps'></div>
                        )}
                    </div>
                </div>
            </div>

            <div className="up-product-column">
                <button className='product-delete' onClick={handleDeleteProduct}><DeleteSVG /> Delete</button>
                <button className='product-close' onClick={() => window.location.href = `/dashboard/t/${id}/${c_id}/`}><PlusSVG /></button>
            </div>
            <div className="left-product-column">
                <div className="product-basic-info">
                    <div className={`image-input ${imageError ? 'wrong' : ''}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: `${backgroundSize}` }} >
                        <label htmlFor="categoryImage"></label>
                        <input type="file" name="categoryImage" id="categoryImage" onChange={handleImageChange} />
                    </div>
                    <div className="product-basic-info-2">
                        <label htmlFor="name" className='product-name-label'>Product Name:</label>
                        <input type="text" name='name' placeholder='Product Name' value={product.name} onChange={(e) => handleProductNameChange(e.target.value)} className={`product-name-input ${nameError ? 'wrong' : ''}`} />
                        <p className="mistake-error">{nameError}</p>
                        <div className="product-propierties">
                            {
                                product.properties.length > 0 ? (product.properties.map((property, index) => {
                                    return (
                                        <div className="property" key={index}>
                                            <img src={`data:image/png;base64,${property.img}`} alt={property.name} />
                                        </div>
                                    )
                                })) : <div></div>
                            }
                            <svg className='product-properties-add' onClick={toggleAddPropertyMenu} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </div>
                    </div>
                </div>
                <label htmlFor="desc">Product Description:</label>
                <textarea onChange={(e) => handleProductDescriptionChange(e.target.value)} value={product.desc} className='product-desc-input' name='desc' rows={5}></textarea>
                <label htmlFor="price">Product Price:</label>
                <input type="text" name='price' placeholder='00.00€' value={product.price} onChange={(e) => handleProductPriceChange(e.target.value)} className={`product-price-input ${priceError ? 'wrong' : ''}`} />
                <p className="mistake-error">{priceError}</p>
            </div>
            <div className="right-product-column">
                <div className="steps-panel">
                    <div className="steps-list">
                        {
                            product.steps.length === 0 ? <div className='empty-steps'><p>This product is currently an individual item.</p></div> :
                                product.steps.map((step, index) => {
                                    return (
                                        <StepDisplay className={`step ${index % 2 === 0 ? 'step-even' : 'step-odd'}`} step={step} key={step.id} setStepType={(newType) => handleStepTypeChange(index, newType)} handleDeleteStep={() => handleStepDelete(index)} handleEdit={() => handleEdit(step)} />
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