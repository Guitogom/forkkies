import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header.jsx'
import { Nav } from './components/Nav.jsx'

/* Pages */
import { Home } from './components/pages/Home.jsx'

function App() {


  return (
    <Router>
    <main>
      <Header />
      <section className="screen">
        <h1>aaa</h1>
        <Routes>
          <Route path="/" exact component={Home} />
        </Routes>
      </section>
      <Nav />
    </main>
    </Router>
  )
}

export default App
