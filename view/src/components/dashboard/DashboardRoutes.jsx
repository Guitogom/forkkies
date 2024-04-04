import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard } from './Dashboard.jsx'

export function DashboardRoutes() {
    return (
        <Router>
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </Router>
    )
}