import { Dashboard } from './components/dashboard/Dashboard.jsx'

export function DashboardRoutes() {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
}