import './styles/App.css'
import { useState } from 'react'
import { Landing } from './components/landing/Landing.jsx'
import { Login } from './components/landing/Login.jsx'
import { Register } from './components/landing/Register.jsx'
import { Dashboard } from './components/dashboard/Dashboard.jsx'
import { Error } from './components/Error.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Client } from './components/client/Client.jsx'
import { LoadingWithText } from './components/dashboard/LoadingWithText.jsx'

function App() {

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/b/:tag" element={<Client />} />
          <Route path="/terms" element={<div><h1>Componente de terminos, si ves esto es que aun no esta implementado y es posible que incluso se nos haya olvidado.</h1></div>} />
          <Route path="*" element={<Error />} />
          <Route path="/text" element={<LoadingWithText />} />
        </Routes>
      </main>
    </Router>
  )

}

export default App
