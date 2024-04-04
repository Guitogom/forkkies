import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Header.jsx'
import { Nav } from './Nav.jsx'

/* Pages */
import { Management } from './pages/Management.jsx'
import { Products } from './pages/Products.jsx'
import { Home } from './pages/Home.jsx'
import { Orders } from './pages/Orders.jsx'
import { Analytics } from './pages/Analytics.jsx'

export function Dashboard() {


    return (
        <Router>
            <main>
                <Header />
                <section className="screen">
                    <Routes>
                        <Route path="/management" element={<Management />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Routes>
                </section>
                <Nav />
            </main>
        </Router>
    )
}