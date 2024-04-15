import { Title } from "../Title.jsx"
import '../../../styles/Categories.css'
import { PlusSVG } from "../../../assets/svg/PlusSVG.jsx"
import { Category } from "./Category.jsx"
import { useEffect, useState } from "react"

export function Categories({ template, setDisplay }) {
    const [status, setStatus] = useState(template.status)
    const button_text = status ? "Set Offline" : "Set Online"

    const handleGoBack = () => {
        setDisplay('default')
    }

    const handleStatus = () => {
        setStatus(!status)
    }

    useEffect(() => {
        template.status = status
        button_text === status ? "Set Offline" : "Set Online"
    }, [status])

    return (
        <section>
            <Title title="Templates" text={`${template.name}`} />
            <div className="template-options">
                <button className="goback-button" onClick={handleGoBack}>Go Back</button>
                <div className="template-options-div">
                    <button className="name-button">Change Name</button>
                    <button className={status ? "set-offline" : "set-online"} onClick={handleStatus}>{button_text}</button>
                    <button className="delete-button">Delete Template</button></div>
            </div>
            <div className="categories-add"><PlusSVG /></div>
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