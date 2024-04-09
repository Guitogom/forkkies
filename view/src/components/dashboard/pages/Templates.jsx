import { useState } from "react"
import { Title } from "../Title"
import { Properties } from "./Properties"
import '../../../styles/Templates.css'
import { Link } from 'react-router-dom'

export function Templates() {
    return (
        <section>
            <Title title="Templates" />
            <div className="body-templates">
                <aside className="left-templates">
                </aside>
                <aside className="right-templates">
                    <Properties />
                </aside>
            </div>
        </section>
    )
}