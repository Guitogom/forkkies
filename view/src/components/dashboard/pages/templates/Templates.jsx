import { useState, useEffect } from "react"
import { Title } from "../../Title.jsx"
import { Properties } from "./Properties.jsx"
import '../../../../styles/Templates.css'
import { TemplateDisplay } from "./TemplateDisplay.jsx"
import { Loading } from '../../Loading.jsx'

import { PlusSVG } from "../../../../assets/svg/PlusSVG.jsx"

export function Templates({ business, setBusiness, setTemplates, templates, businessStatus }) {
    const [display, setDisplay] = useState('default')
    const [newTemplate, setNewTemplate] = useState(false)

    const handleClick = async (template, active) => {
        try {
            const data = { template }
            setTemplate(data)
            setIsActive(active)
            setDisplay('categories')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // useEffect(() => {
    //     setTemplates(business.templates)
    //     console.log(business.templates)
    //     console.log(templates)
    // }, [business])

    const addTemplate = () => {
        const token = localStorage.getItem('session_token')
        fetch('https://api.forkkies.live/newtemplate', {
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
            return response.json()
        }
        ).then(response => {
            let template = { business_id: business.id, id: response.result, name: 'Unnamed template' }
            setTemplates([...templates, template])
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
                                    const isActive = template.id === parseInt(businessStatus)
                                    return (
                                        <TemplateDisplay
                                            template={template}
                                            key={index}
                                            handleClick={handleClick}
                                            active={isActive}
                                        />
                                    );
                                })
                            }
                            <div className="template-add" onClick={addTemplate}>
                                <PlusSVG />
                            </div>
                        </div>
                    </aside>
                    <aside className="right-templates">
                        <Properties business={business} setBusiness={setBusiness} />
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