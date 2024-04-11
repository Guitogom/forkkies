import { useState } from "react"
import { Title } from "../Title.jsx"
import { Properties } from "./Properties.jsx"
import '../../../styles/Templates.css'
import { TemplateDisplay } from "./TemplateDisplay.jsx"

export function Templates() {
    const [templates, setTemplates] = useState([
        { id: 1, name: "Menu Verano", status: true },
        { id: 2, name: "Menu Otoño", status: false },
        { id: 3, name: "Menu Primavera", status: false },
        { id: 4, name: "Menu Invierno", status: false },
        { id: 5, name: "Menu Navidad", status: false },
        { id: 6, name: "Menu Invierno", status: false },
        { id: 7, name: "Menu Navidad", status: false },
        { id: 8, name: "Menu Verano", status: false },
        { id: 9, name: "Menu Otoño", status: false },
        { id: 10, name: "Menu Primavera", status: false }
    ])



    return (
        <section>
            <Title title="Templates" />
            <div className="body-templates">
                <aside className="left-templates">
                    <div className="left-templates-div">
                        {
                            templates.map((template, index) => {
                                return (
                                    <TemplateDisplay template={template} key={index} />
                                )
                            })

                        }
                    </div>
                </aside>
                <aside className="right-templates">
                    <Properties />
                </aside>
            </div>
        </section>
    )
}