

export function Products({ template, setDisplay }) {
    const [products, setProducts] = useState(template.products)
    const [changeNameDisplay, setChangeNameDisplay] = useState('none')
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [nameError, setNameError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    const handleGoBack = () => {
        setDisplay('categories')
    }

    const handleCreateProduct = () => {
        setChangeNameDisplay('flex')
    }

    const saveProductName = () => {
        if (productName.trim() === '') {
            setNameError('Name cannot be empty')
            return
        }
        setChangeNameDisplay('none')
    }

    const saveProductPrice = () => {
        if (productPrice.trim() === '') {
            setPriceError('Price cannot be empty')
            return
        }
        setChangeNameDisplay('none')
    }

    const saveProductDescription = () => {
        if (productDescription.trim() === '') {
            setDescriptionError('Description cannot be empty')
            return
        }
        setChangeNameDisplay('none')
    }

    useEffect(() => {
        template.products = products
    }, [products])

    return (
        <section>
            <div className="change-template-name" style={{ display: `${changeNameDisplay}` }}>
                <input type="text" placeholder="Introduce a new name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                <p className="error-text">{nameError}</p>
                <button onClick={saveProductName}>Save</button>
            </div>
            <div className="change-template-name" style={{ display: `${changeNameDisplay}` }}>
                <input type="text" placeholder="Introduce a new price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                <p className="error-text">{priceError}</p>
                <button onClick={saveProductPrice}>Save</button>
            </div>
            <div className="change-template-name" style={{ display: `${changeNameDisplay}` }}>
                <input type="text" placeholder="Introduce a new description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                <p className="error-text">{descriptionError}</p>
                <button onClick={saveProductDescription}>Save</button>
            </div>
        </section>
    )
}