import { Title } from "../../Title.jsx"
import '../../../../styles/Categories.css'
import { PlusSVG } from "../../../../assets/svg/PlusSVG.jsx"
import { CategoryDisplay } from "./CategoryDisplay.jsx"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Loading } from '../../Loading.jsx'

export function Template({ business, setBusiness, setTemplates, templates }) {
    const [loaded, setLoaded] = useState(false)
    const [template, setTemplate] = useState(business.templates)
    const [categories, setCategories] = useState([])
    const [status, setStatus] = useState(business.active_template === null ? false : true)
    const [changeNameDisplay, setChangeNameDisplay] = useState('none')
    const [templateName, setTemplateName] = useState('...')
    const [nameError, setNameError] = useState('')
    const buttonText = status ? "Set Offline" : "Set Online"
    const { id } = useParams()

    useEffect(() => {
        buttonText === status ? "Set Offline" : "Set Online"
    }, [status])

    const navigate = useNavigate()

    const handleStatus = () => {
        setStatus(!status)
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            fetch(`https://api.forkkies.live/modifytemplate`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, [`${status ? 'deactivate' : 'activate'}`]: true })
            })
                .then(response => {
                    if (!response.ok) {
                        navigate('/error')
                    }
                    if (status) {
                        setBusiness({ ...business, active_template: null })
                    } else {
                        setBusiness({ ...business, active_template: id })
                    }
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    navigate('/error')
                })
        }
    }

    const handleCreateCategory = () => {
        navigate(`/dashboard/t/${id}/cp/new`)
    }

    const changeTemplateName = () => {
        setChangeNameDisplay('flex')
    }

    const saveTemplateName = () => {
        if (templateName.trim() === '') {
            setNameError('Name cannot be empty')
            return
        }
        setChangeNameDisplay('none')
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')

            const updatedTemplates = business.templates.map(template =>
                template.id === parseInt(id) ? { ...template, name: templateName } : template
            )

            setBusiness(prevBusiness => ({
                ...prevBusiness,
                templates: updatedTemplates
            }))

            fetch(`https://api.forkkies.live/modifytemplate`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, name: templateName })
            })
                .then(response => {
                    if (!response.ok) {
                        navigate('/error')
                    }
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    navigate('/error')
                })
        }
    }

    const handleTemplateDelete = () => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            let newTemplates = business.templates.filter(template => template.id !== id)
            setTemplates(newTemplates)
            setBusiness({ ...business, templates: newTemplates })

            fetch(`https://api.forkkies.live/modifytemplate`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, delete: true })
            })
                .then(response => {
                    if (!response.ok) {
                        navigate('/error')
                    }
                    navigate('/dashboard/templates')
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    navigate('/error')
                })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            fetch(`https://api.forkkies.live/gettemplate?id=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        navigate('/error')
                    }
                    return response.json()
                })
                .then(template => {
                    setTemplate(template.result.template)
                    setTemplateName(template.result.template.name)
                    setStatus(template.result.template.status)
                    setCategories(template.result.categories)
                    setLoaded(true)
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    navigate('/error')
                })
        }
    }, [])

    if (!loaded) return <Loading />

    return (
        <section>
            <div className="notification">

            </div>
            <div className="change-template-name" style={{ display: `${changeNameDisplay}` }}>
                <p className="error-text">{nameError}</p>
                <input type="text" placeholder="Introduce a new name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
                <button onClick={saveTemplateName} className="">Save</button>
            </div>


            <Title title="Templates" text={`${templateName}`} />
            <div className="template-options">
                <button className="template-name-button" onClick={changeTemplateName}>Change Name</button>
                <div className="template-options-div">
                    <button className={status ? "template-set-online" : "template-set-offline"} onClick={handleStatus}>{buttonText}</button>
                    <button className="template-delete-button" onClick={handleTemplateDelete}>Delete Template</button>
                    <Link className="template-goback-button" to='/dashboard/templates'>Go Back</Link></div>
            </div>
            <div className="categories-add" onClick={handleCreateCategory}><PlusSVG /></div>
            <div className="categories">
                {
                    template.length === 0 ? <p>No categories yet</p> :
                        categories.map((category, index) => {
                            return (
                                <CategoryDisplay key={index} category={category} />
                            )
                        })
                }
            </div>
        </section>
    )
}