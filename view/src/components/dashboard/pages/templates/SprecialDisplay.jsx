

export function SpecialDisplay({ special }) {
    return (
        <div>
            <img src={special.img} alt={special.name} />
            <input type="text" placeholder="Item Name" />
            <p>{special.price_changer}</p>
        </div>
    )
}