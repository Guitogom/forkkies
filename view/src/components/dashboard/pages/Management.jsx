import { Title } from "../Title"
import '../../../styles/Management.css'

export function Management() {
    return (
        <section>
            <Title title="Management" text="Management" />
            <div className="management-flex">
                <div className="management-inner">
                    <h1>Col 1</h1>
                </div>
                <div className="management-inner">
                    <h1>Col 2</h1>
                </div>
            </div>
        </section>
    )
}