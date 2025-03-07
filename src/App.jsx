import './App.css'
import { useState } from "react"
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
import NavMenu from './components/NavMenu/NavMenu'
import Home from './components/Home/Home';
import ModalComponent from './components/ModalComponent/ModalComponent';

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
    <div>
    <NavMenu 
      triggerLoginModal={() => setShowLogin(true)}
      triggerRegisterModal={() => setShowRegister(true)}/>

    <NavLink to = "/">Home</NavLink>
      <NavLink to = "/seasons/">Explore Seasons </NavLink>
      <NavLink to = "/locations/">All Locations </NavLink>
      <NavLink to = "/itineraries/">My Trips </NavLink>
    <main>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register/" element={<Register />} />
        <Route path="/auth/login/" element={<Login />} />
        <Route path="/locations/" element={<AllLocations triggerLoginModal={() => setShowLogin(true)}
                            triggerRegisterModal={() => setShowRegister(true)} />} />
        <Route path="/seasons/:seasonId/locations/" element={<SeasonalLocations />} />
        <Route path="/seasons/" element={<Seasons />} />
        <Route path="/itineraries/" element={<AllItineraries />} />
        <Route path="/itineraries/create/" element={<CreateItinerary />} />
        <Route path="/itineraries/:itineraryId/" element={<SingleItinerary />} />
        <Route path="/itineraries/:itineraryId/edit/" element={<UpdateItinerary />} />
      
      </Routes>

    </main>
    </div>

            <ModalComponent show={showLogin} handleClose={() => setShowLogin(false)} title="Login">
                <Login handleClose={() => setShowLogin(false)} />
            </ModalComponent>

            <ModalComponent show={showRegister} handleClose={() => setShowRegister(false)} title="Sign Up">
                <Register handleClose={() => setShowRegister(false)} />
            </ModalComponent>
      
    </>
  )
}

export default App
