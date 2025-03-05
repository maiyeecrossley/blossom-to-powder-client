import './App.css'

import { Routes, Route, NavLink } from "react-router"

import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import SeasonalLocations from './components/SeasonalLocations/SeasonalLocations'
import Seasons from './components/Seasons/Seasons'
import AllLocations from './components/AllLocations/AllLocations'
import AllItineraries from './components/AllItineraries/AllItineraries'
import SingleItinerary from './components/SingleItinerary/SingleItinerary'
import CreateItinerary from './components/CreateItinerary/CreateItinerary'

function App() {
  

  return (
    <>
    <nav>
      <NavLink to = "/">Home</NavLink>
      <NavLink to = "/auth/register/">Register </NavLink>
      <NavLink to = "/auth/login/">Login </NavLink>
      <NavLink to = "/seasons/">Explore Seasons </NavLink>
      <NavLink to = "/locations/">All Locations </NavLink>
      <NavLink to = "/itineraries/">My Trips </NavLink>
      <NavLink to = "/itineraries/create/">Create trip </NavLink>

    </nav>
    <main>
      <Routes>
        <Route path="/auth/register/" element={<Register />} />
        <Route path="/auth/login/" element={<Login />} />
        <Route path="/locations/" element={<AllLocations />} />
        <Route path="/seasons/:seasonId/locations/" element={<SeasonalLocations />} />
        <Route path="/seasons/" element={<Seasons />} />
        <Route path="/itineraries/" element={<AllItineraries />} />
        <Route path="/itineraries/create/" element={<CreateItinerary />} />
        <Route path="/itineraries/:itineraryId/" element={<SingleItinerary />} />
      
      </Routes>
    </main>
    </>
  )
}

export default App
