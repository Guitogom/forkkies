import { ClientCategoryProp } from "./props/ClientCategoryProp.jsx";

export function ClientCategories({ categories, secondaryColor }) {
    return (
        <div className="client-categories">
            {
                categories.map((category, index) => {
                    return <ClientCategoryProp key={index} category={category} secondaryColor={secondaryColor} />
                })
            }
        </div>
    )
}