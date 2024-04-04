import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Header.jsx'
import { Nav } from './Nav.jsx'

/* Pages */
import { Home } from './pages/Home.jsx'

export function Dashboard() {


    return (
        <Router>
            <main>
                <Header />
                <section className="screen">
                    <h1>PG</h1>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </section>
                <Nav />
            </main>
        </Router>
    )
}