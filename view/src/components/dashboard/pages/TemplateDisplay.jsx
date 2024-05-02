import { Link } from 'react-router-dom';

export function TemplateDisplay({ template, handleClick, active }) {
    return (
        <Link className="template" to={`/dashboard/t/${template.id}`} >
            <h2>{template.name}</h2>
            <p className={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</p>
        </Link >
    )
}