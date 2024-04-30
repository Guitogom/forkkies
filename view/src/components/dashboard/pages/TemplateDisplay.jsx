

export function TemplateDisplay({ template, handleClick, active }) {
    return (
        <div className="template" onClick={() => handleClick(template, active)}>
            <h2>{template.name}</h2>
            <p className={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</p>
        </div>
    )
}