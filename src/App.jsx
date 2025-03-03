import './App.css'

import { Routes, Route, NavLink } from "react-router"

import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import SeasonalLocations from './components/SeasonalLocations/SeasonalLocations'
import Seasons from './components/Seasons/Seasons'

function App() {
  

  return (
    <>
    <nav>
      <NavLink to = "/">Home</NavLink>
      <NavLink to = "/auth/register/">Register </NavLink>
      <NavLink to = "/auth/login/">Login </NavLink>
      <NavLink to = "/seasons/">Explore Seasons </NavLink>

    </nav>
    <main>
      <Routes>
        <Route path="/auth/register/" element={<Register />} />
        <Route path="/auth/login/" element={<Login />} />
        <Route path="/seasons/:seasonId/locations/" element={<SeasonalLocations />} />
        <Route path="/seasons/" element={<Seasons />} />
      
      </Routes>
    </main>
    </>
  )
}

export default App
