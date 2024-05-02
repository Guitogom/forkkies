import { useState, useEffect } from "react"
import { Title } from "../Title.jsx"
import { Properties } from "./Properties.jsx"
import '../../../styles/Templates.css'
import { TemplateDisplay } from "./TemplateDisplay.jsx"
import { Loading } from '../Loading.jsx'

import { CreateCategory } from "./CreateCategory.jsx"
import { Products } from "./Products.jsx"
import { PlusSVG } from "../../../assets/svg/PlusSVG.jsx"

export function Templates({ business, setBusiness }) {
    const [loaded, setLoaded] = useState(false)
    const [display, setDisplay] = useState('default')
    const [newTemplate, setNewTemplate] = useState(false)
    const [templates, setTemplates] = useState([])
    const [activeTemplate, setActiveTemplate] = useState(null)
    // { id: 1, name: "Menu Otoño", status: false, categories: [{ name: "Fish", img: "fish.jpg" }, { name: "Meat", img: "meat.jpg" }, { name: "Vegan", img: "vegan.jpg" }, { name: "Chips", img: "none" }, { name: "Drinks", img: "drinks.jpg" }], products: [{ name: "Salmon", img: "nose.jpg", category: "Fish" }] },
    // { id: 2, name: "Menu Verano", status: true, categories: [{ name: "Fish", img: "fish.jpg" }, { name: "Meat", img: "meat.jpg" }, { name: "Vegan", img: "vegan.jpg" }] },
    // { id: 3, name: "Menu Primavera", status: false, categories: [{ name: "Fish", img: "fish.jpg" }, { name: "Meat", img: "meat.jpg" }, { name: "Vegan", img: "vegan.jpg" }] },
    // { id: 4, name: "Menu Invierno", status: false }

    const [template, setTemplate] = useState({})
    const [isActive, setIsActive] = useState(false)


    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            const timeout = setTimeout(() => {
                setCurrentPage('error')
            }, 8000)
            fetch('http://147.182.207.78:3000/getalltemplates', {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    clearTimeout(timeout)
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    return response.json()
                })
                .then(business => {
                    console.log(business)
                    setActiveTemplate(business.active_template)
                    setTemplates(business.templates)
                    setLoaded(true)
                })
                .catch(error => {
                    clearTimeout(timeout)
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })
        }
    }, [newTemplate])

    if (!loaded) return <Loading />

    const handleClick = async (template, active) => {
        try {
            // const response = await fetch('http://localhost:3000/templates')
            // if (!response.ok) {
            //     throw new Error('Error al obtener los datos de la plantilla')
            // }
            // const data = await response.json()
            const data = { template }
            setTemplate(data)
            setIsActive(active)
            setDisplay('categories')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const addTemplate = () => {
        const token = localStorage.getItem('session_token')
        fetch('http://147.182.207.78:3000/newtemplate', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos')
            }
            setNewTemplate(!newTemplate)
        }
        ).catch(error => {
            console.error('Error:', error.message)
        })
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
                                    if (template.id === activeTemplate) return (<TemplateDisplay template={template} key={index} handleClick={handleClick} active={true} />)
                                    return (
                                        <TemplateDisplay template={template} key={index} handleClick={handleClick} active={false} />
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
        case 'products':
            content = <div>
                <Products setDisplay={setDisplay} />
            </div>
            break
    }


    return (
        <section>
            {content}
        </section>
    )
}