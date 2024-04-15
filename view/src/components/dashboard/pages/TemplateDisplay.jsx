

export function TemplateDisplay({ template, handleClick }) {
    return (
        <div className="template" onClick={() => handleClick(template)}>
            <h2>{template.name}</h2>
            <p className={template.status ? 'green' : 'red'}>{template.status ? 'Active' : 'Inactive'}</p>
        </div>
    )
}