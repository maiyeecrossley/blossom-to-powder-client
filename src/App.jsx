import './App.css'

import { Routes, Route, NavLink } from "react-router"

import Register from "./components/Register/Register"

function App() {
  

  return (
    <>
    <nav>
      <NavLink to = "/">Home</NavLink>
      <NavLink to = "/auth/register/">Register </NavLink>
    </nav>
    <main>
      <Routes>
        <Route path="/auth/register/" element={<Register />} />
      
      </Routes>
    </main>
    </>
  )
}

export default App
