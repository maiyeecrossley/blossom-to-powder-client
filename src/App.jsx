import './App.css'

import { Routes, Route, NavLink } from "react-router"

import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import AllLocations from './components/AllLocations/AllLocations'

function App() {
  

  return (
    <>
    <nav>
      <NavLink to = "/">Home</NavLink>
      <NavLink to = "/auth/register/">Register </NavLink>
      <NavLink to = "/auth/login/">Login </NavLink>
      <NavLink to = "/locations/">All Locations </NavLink>

    </nav>
    <main>
      <Routes>
        <Route path="/auth/register/" element={<Register />} />
        <Route path="/auth/login/" element={<Login />} />
        <Route path="/locations/" element={<AllLocations />} />
      
      </Routes>
    </main>
    </>
  )
}

export default App
