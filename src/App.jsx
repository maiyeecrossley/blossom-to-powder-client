import './App.css'

import { Routes, Route, NavLink } from "react-router"

import Register from "./components/Register/Register"
import Login from "./components/Login/Login"

function App() {
  

  return (
    <>
    <nav>
      <NavLink to = "/">Home</NavLink>
      <NavLink to = "/auth/register/">Register </NavLink>
      <NavLink to = "/auth/login/">Login </NavLink>
    </nav>
    <main>
      <Routes>
        <Route path="/auth/register/" element={<Register />} />
        <Route path="/auth/login/" element={<Login />} />
      
      </Routes>
    </main>
    </>
  )
}

export default App
