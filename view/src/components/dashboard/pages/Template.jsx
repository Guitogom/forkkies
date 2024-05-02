import { Title } from "../Title.jsx"
import '../../../styles/Categories.css'
import { PlusSVG } from "../../../assets/svg/PlusSVG.jsx"
import { Category } from "./Category.jsx"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Loading } from '../Loading.jsx'

export function Template() {
    const [loaded, setLoaded] = useState(false)
    const [template, setTemplate] = useState([])
    const [categories, setCategories] = useState([])
    const [status, setStatus] = useState(null)
    const [changeNameDisplay, setChangeNameDisplay] = useState('none')
    const [templateName, setTemplateName] = useState('...')
    const [nameError, setNameError] = useState('')
    const buttonText = status ? "Set Offline" : "Set Online"
    const { id } = useParams()

    const handleStatus = () => {
        setStatus(!status)
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            const timeout = setTimeout(() => {
                setCurrentPage('error')
            }, 8000)
            fetch(`http://147.182.207.78:3000/modifytemplate`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, [`${status ? 'deactivate' : 'activate'}`]: true })
            })
                .then(response => {
                    clearTimeout(timeout)
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    buttonText === status ? "Set Offline" : "Set Online"
                })
                .catch(error => {
                    clearTimeout(timeout)
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })
        }
    }

    const handleCreateCategory = () => {
        window.location.href = `/dashboard/t/${id}/newcategory`
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
            const timeout = setTimeout(() => {
                setCurrentPage('error')
            }, 8000)
            fetch(`http://147.182.207.78:3000/modifytemplate`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, name: templateName })
            })
                .then(response => {
                    clearTimeout(timeout)
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                })
                .catch(error => {
                    clearTimeout(timeout)
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })
        }
    }

    const handleTemplateDelete = () => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            const timeout = setTimeout(() => {
                setCurrentPage('error')
            }, 8000)
            fetch(`http://147.182.207.78:3000/modifytemplate`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, delete: true })
            })
                .then(response => {
                    clearTimeout(timeout)
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    window.location.href = '/dashboard/templates'
                })
                .catch(error => {
                    clearTimeout(timeout)
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            const timeout = setTimeout(() => {
                setCurrentPage('error')
            }, 8000)
            fetch(`http://147.182.207.78:3000/gettemplate?id=${id}`, {
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
                .then(template => {
                    console.log(template)
                    setTemplate(template.result.template)
                    setTemplateName(template.result.template.name)
                    setStatus(template.result.template.status)
                    setCategories(template.result.categories)
                    setLoaded(true)
                })
                .catch(error => {
                    clearTimeout(timeout)
                    console.error('Error:', error.message)
                    window.location.href = '/error'
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
                <Link className="template-goback-button" to='/dashboard/templates'>Go Back</Link>
                <div className="template-options-div">
                    <button className="template-name-button" onClick={changeTemplateName}>Change Name</button>
                    <button className={status ? "template-set-offline" : "template-set-online"} onClick={handleStatus}>{buttonText}</button>
                    <button className="template-delete-button" onClick={handleTemplateDelete}>Delete Template</button></div>
            </div>
            <div className="categories-add" onClick={handleCreateCategory}><PlusSVG /></div>
            <div className="categories">
                {
                    template.length === 0 ? <p>No categories yet</p> :
                        categories.map((category, index) => {
                            return (
                                <Category key={index} category={category} />
                            )
                        })
                }
            </div>
        </section>
    )
}