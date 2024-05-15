import { useParams } from "react-router-dom"

export function Client() {
    const { tag } = useParams()



    return (
        <h1>VISTA CLIENTE!!</h1>
    )
}