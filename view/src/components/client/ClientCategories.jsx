import { ClientCategoryProp } from "./props/ClientCategoryProp.jsx";

export function ClientCategories({ categories, secondaryColor }) {
    const filteredCategories = categories.filter(category => category.products && category.products.length > 0)

    return (
        <div className="client-categories">
            {filteredCategories.length > 0 && filteredCategories.map(category => (
                <ClientCategoryProp key={category.id} category={category} secondaryColor={secondaryColor} />
            ))}
        </div>
    )
}