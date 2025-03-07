import './App.css'
import { Routes, Route, NavLink } from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import SeasonalLocations from './components/SeasonalLocations/SeasonalLocations'
import Seasons from './components/Seasons/Seasons'
import AllLocations from './components/AllLocations/AllLocations'
import AllItineraries from './components/AllItineraries/AllItineraries'
import SingleItinerary from './components/SingleItinerary/SingleItinerary'
import CreateItinerary from './components/CreateItinerary/CreateItinerary'
import UpdateItinerary from './components/UpdateItinerary/UpdateItinerary'
import Navbar from './components/NavBar/NavBar'

function App() {
  

  return (
    <>
    <div>
    <Navbar />
    <NavLink to = "/">Home</NavLink>
      <NavLink to = "/seasons/">Explore Seasons </NavLink>
      <NavLink to = "/locations/">All Locations </NavLink>
      <NavLink to = "/itineraries/">My Trips </NavLink>
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
        <Route path="/itineraries/:itineraryId/edit/" element={<UpdateItinerary />} />
      
      </Routes>
    </main>
    </div>
      


    </>
  )
}

export default App
