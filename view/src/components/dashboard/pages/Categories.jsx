import { Title } from "../Title.jsx"
import '../../../styles/Categories.css'
import { PlusSVG } from "../../../assets/svg/PlusSVG.jsx"
import { Category } from "./Category.jsx"
import { useEffect, useState } from "react"

export function Categories({ template, setDisplay }) {
    const [status, setStatus] = useState(template.status)
    const [changeNameDisplay, setChangeNameDisplay] = useState('none')
    const [templateName, setTemplateName] = useState(template.name);
    const [nameError, setNameError] = useState('')
    const buttonText = status ? "Set Offline" : "Set Online"

    const handleGoBack = () => {
        setDisplay('default')
    }

    const handleStatus = () => {
        setStatus(!status)
    }

    const handleCreateCategory = () => {
        setDisplay('create-category')
    }

    const changeTemplateName = () => {
        setChangeNameDisplay('flex')
    }

    const saveTemplateName = () => {
        if (templateName.trim() === '') {
            setNameError('Name cannot be empty');
            return;
        }
        setChangeNameDisplay('none')
    }

    useEffect(() => {
        template.status = status
        buttonText === status ? "Set Offline" : "Set Online"
    }, [status])

    return (
        <section>
            <div className="notification">

            </div>
            <div className="change-template-name" style={{ display: `${changeNameDisplay}` }}>
                <input type="text" placeholder="Introduce a new name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
                <p className="error-text">{nameError}</p>
                <button onClick={saveTemplateName}>Save</button>
            </div>


            <Title title="Templates" text={`${templateName}`} />
            <div className="template-options">
                <button className="goback-button" onClick={handleGoBack}>Go Back</button>
                <div className="template-options-div">
                    <button className="name-button" onClick={changeTemplateName}>Change Name</button>
                    <button className={status ? "set-offline" : "set-online"} onClick={handleStatus}>{buttonText}</button>
                    <button className="delete-button">Delete Template</button></div>
            </div>
            <div className="categories-add" onClick={handleCreateCategory}><PlusSVG /></div>
            <div className="categories">
                {
                    template.categories.map((category, index) => {
                        return (
                            <Category key={index} category={category} />
                        )
                    })
                }
            </div>
        </section>
    )
}