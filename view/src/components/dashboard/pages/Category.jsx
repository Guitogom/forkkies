

export function Category({ category }) {
    const openCategory = () => {
        console.log('Abriendo categoría:', category.name)
    }

    return (
        <div className="category" onClick={openCategory}>
            <img src="https://www.naturalcastello.com/wp-content/uploads/2019/08/pescados-tipos-propiedades.jpg" alt={category.name} />
            <h1>{category.name}</h1>
        </div>
    )
}