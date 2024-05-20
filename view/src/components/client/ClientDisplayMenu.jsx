import { Link, useParams } from 'react-router-dom'

export function ClientDisplayMenu({ displayNav, setDisplayNav, themeColor }) {
    const { tag } = useParams()

    return (
        <section className="client-display-menu" style={{ width: displayNav ? '100%' : '0px', backgroundColor: themeColor }}>
            <div className="client-nav-list">
                <h2>NO se que va aqui</h2>
                <Link to={`/b/${tag}/categories`} onClick={() => setDisplayNav(!displayNav)}>Categorias</Link>
            </div>
        </section>
    )
}