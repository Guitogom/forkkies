

export function Category({ category }) {
    return (
        <div className="category">
            <img src="https://www.naturalcastello.com/wp-content/uploads/2019/08/pescados-tipos-propiedades.jpg" alt="" />
            <h1>{category.name}</h1>
        </div>
    )
}