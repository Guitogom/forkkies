import { useState } from "react"
import { PlusSVG } from "../../../../assets/svg/PlusSVG"

export function Properties() {
    const [properties, setProperties] = useState([])

    const uploadProperty = (e) => {
        //Obtenemos la imagen en binario
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (localStorage.getItem('session_token') !== null) {
                const token = localStorage.getItem('session_token')
                fetch('https://api.forkkies.live/newproperty', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: file.name.split('.')[0],
                        img: reader.result.split(',')[1]
                    })
                })
                    .then(response => {
                        if (!response.ok) {
                            window.location.href = '/error'
                        }
                        return response.json()
                    })
                    .catch(error => {
                        console.error('Error:', error.message)
                        window.location.href = '/error'
                    })
            }
        };
    }

    return (
        <section className="properties">
            <h2>Properties</h2>
            <div className="properties-container">

            </div>
            <div className="properties-add">
                <input type="file" onInput={uploadProperty} />
                <PlusSVG />
            </div>
        </section>
    )
}