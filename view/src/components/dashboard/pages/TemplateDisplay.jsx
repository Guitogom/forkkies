import { Link } from 'react-router-dom'

export function TemplateDisplay({ template }) {
    return (
        <Link to={`/templates/${template.id}`} className="template">
            <h2>{template.name}</h2>
            <p className={template.status ? 'green' : 'red'}>{template.status ? 'Active' : 'Inactive'}</p>
        </Link>
    )
}