import { useState } from 'react'

export function SpecialDisplay({ special }) {
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

    const changeSpecialName = (e) => {
        special.name = e.target.value
    }

    const changeSpecialPriceChanger = (e) => {
        special.price_changer = e.target.value
    }

    return (
        <div className="special-item">
            <div className="image-input" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: `${backgroundSize}` }} >
                <label htmlFor="categoryImage"></label>
                <input type="file" name="categoryImage" id="categoryImage" onChange={handleImageChange} />
            </div>
            <input type="text" placeholder="Item Name" value={special.name} onChange={changeSpecialName} />
            <input type="text" placeholder="Price diference (+ or -)" value={special.price_changer} onChange={changeSpecialPriceChanger} />
        </div>
    )
}