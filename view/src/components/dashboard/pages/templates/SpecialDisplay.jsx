import { useEffect, useState } from 'react'

export function SpecialDisplay({ special, onDelete }) {
    const [backgroundImage, setBackgroundImage] = useState('/src/assets/media/camera.webp')
    const [backgroundSize, setBackgroundSize] = useState('60px')

    useEffect(() => {
        if (special.img) {
            setBackgroundImage(`data:image/jpeg;base64,${special.img}`)
            setBackgroundSize('cover')
        }
    }, [special.img])

    const handleSpecialImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setBackgroundImage(reader.result)
                setBackgroundSize('cover')
                special.img = reader.result.split(',')[1]
            }
            reader.readAsDataURL(file)
        }
    }

    const changeSpecialName = (e) => {
        special.name = e.target.value
    }

    const changeSpecialPriceChanger = (e) => {
        special.price_changer = e.target.value
    }

    return (
        <div className="special-item">
            <div className="image-input-special" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: `${backgroundSize}` }} >
                <label htmlFor="categoryImage"></label>
                <input type="file" name="categoryImage" id="categoryImage" onChange={handleSpecialImageChange} />
            </div>
            <input type="text" placeholder="Item Name" defaultValue={special.name} onChange={changeSpecialName} className='special-name-input' />
            <input type="text" placeholder="Price difference (+ or -)" defaultValue={special.price_changer} onChange={changeSpecialPriceChanger} className='special-price-input' />
            <button className='special-delete' onClick={onDelete}>Delete</button>
        </div>
    )
}
