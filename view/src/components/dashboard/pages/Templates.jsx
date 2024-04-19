import { useState } from "react"
import { Title } from "../Title.jsx"
import { Properties } from "./Properties.jsx"
import '../../../styles/Templates.css'
import { TemplateDisplay } from "./TemplateDisplay.jsx"
import { Categories } from "./Categories.jsx"
import { CreateCategory } from "./CreateCategory.jsx"
import { PlusSVG } from "../../../assets/svg/PlusSVG.jsx"

export function Templates({ business, setBusiness }) {
    const [display, setDisplay] = useState('default')
    const [templates, setTemplates] = useState([
        { id: 1, name: "Menu Otoño", status: false, categories: [{ name: "Fish", img: "fish.jpg" }, { name: "Meat", img: "meat.jpg" }, { name: "Vegan", img: "vegan.jpg" }, { name: "Chips", img: "none" }, { name: "Drinks", img: "drinks.jpg" }] },
        { id: 2, name: "Menu Verano", status: true, categories: [{ name: "Fish", img: "fish.jpg" }, { name: "Meat", img: "meat.jpg" }, { name: "Vegan", img: "vegan.jpg" }] },
        { id: 3, name: "Menu Primavera", status: false, categories: [{ name: "Fish", img: "fish.jpg" }, { name: "Meat", img: "meat.jpg" }, { name: "Vegan", img: "vegan.jpg" }] },
        { id: 4, name: "Menu Invierno", status: false }
    ])

    const [template, setTemplate] = useState({})

    const handleClick = async (template) => {
        try {
            // const response = await fetch('http://localhost:3000/templates')
            // if (!response.ok) {
            //     throw new Error('Error al obtener los datos de la plantilla')
            // }
            // const data = await response.json()
            const data = { template }
            setTemplate(data)
            setDisplay('categories')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const addTemplate = () => {

    }

    let content = null

    switch (display) {
        case 'default':
            content = <div>
                <Title title="Templates" text="Templates" />
                <div className="body-templates">
                    <aside className="left-templates">
                        <div className="left-templates-div">
                            {
                                templates.map((template, index) => {
                                    return (
                                        <TemplateDisplay template={template} key={index} handleClick={handleClick} />
                                    )
                                })
                            }
                            <div className="template-add" onClick={addTemplate}>
                                <PlusSVG />
                            </div>
                        </div>
                    </aside>
                    <aside className="right-templates">
                        <Properties />
                    </aside>
                </div>
            </div>
            break
        case 'categories':
            content = <div>
                <Categories template={template.template} setDisplay={setDisplay} />
            </div>
            break
        case 'create-category':
            content = <div>
                <CreateCategory setDisplay={setDisplay} />
            </div>
            break
        case 'products':
            content = <div>
                <h1>Products</h1>
            </div>
            break
    }


    return (
        <section>
            {content}
        </section>
    )
}