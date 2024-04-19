import { useState } from "react"
import { PlusSVG } from "../../../assets/svg/PlusSVG"

export function Properties() {
    const [properties, setProperties] = useState([])

    const handleAdd = () => {

    }

    return (
        <section className="properties">
            <h2>Properties</h2>
            <div className="properties-container">

            </div>
            <div className="properties-add" onClick={handleAdd}>
                <PlusSVG />
            </div>
        </section>
    )
}