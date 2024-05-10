import { useState } from 'react'
import { EditSVG } from '../../../../assets/svg/EditSVG.jsx'
import { DeleteSVG } from '../../../../assets/svg/DeleteSVG.jsx'

export function StepDisplay({ className, step, setStepType, handleDeleteStep, handleEdit }) {
    const [type, setType] = useState(step.type)

    const handleChange = (e) => {
        const newType = e.target.value
        setType(newType)
        setStepType(newType)
    }

    return (
        <div className={className}>
            <p className="step-title">{step.title}</p>
            <select name="" value={type} onChange={handleChange} className="step-select">
                <option value="1" title='This allows you to let the client choose from a few options'>options</option>
                <option value="2" title='This allows you to let the client remove something from the product'>deletables</option>
                <option value="3" title='This allows you to let the client add something extra to the product'>extras</option>
            </select>
            <div className="step-options">
                <button className="step-edit" onClick={handleEdit}><EditSVG /></button>
                <button className="step-delete" onClick={handleDeleteStep}><DeleteSVG /></button>
            </div>
        </div>
    )
}