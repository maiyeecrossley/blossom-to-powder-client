import { useState, useContext } from "react";
import { useNavigate } from "react-router"
import { Button } from "react-bootstrap"
import { removeToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";
import ModalComponent from "../ModalComponent/ModalComponent"
import Login from "../Login/Login"
import Register from "../Register/Register"
import CreateItinerary from "../CreateItinerary/CreateItinerary"


export default function Navbar() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showCreateItinerary, setShowCreateItinerary] = useState(false)


    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const signOut = () => {
            removeToken()
            setUser(null)
            setTimeout(() => navigate('/'), 100)
        }

    const closeCreateModal = () => {
        setShowCreateModal(false)
        }

    return (
        <nav>

            {!user 
            ?
                <>
                    <Button variant="outline-primary" onClick={() => setShowLogin(true)}>Login</Button>
                    <Button variant="outline-success" onClick={() => setShowRegister(true)}>Sign Up</Button>
                </>
            :
                <>
                    <Button variant="outline-warning" onClick={() => setShowCreateItinerary(true)}>
                        + New Itinerary
                    </Button>
                    <Button variant="outline-danger" onClick={signOut}>Sign Out</Button>
                </>
            }

            <ModalComponent show={showLogin} handleClose={() => setShowLogin(false)} title="Login">
                <Login handleClose={() => setShowLogin(false)} />
            </ModalComponent>

            <ModalComponent show={showRegister} handleClose={() => setShowRegister(false)} title="Sign Up">
                <Register handleClose={() => setShowRegister(false)} />
            </ModalComponent>

                <ModalComponent show={showCreateItinerary} handleClose={() => setShowCreateItinerary(false)} title="Create Itinerary">
                    <CreateItinerary handleClose={() => setShowCreateItinerary(false)} />
                </ModalComponent>

        </nav>
    )
}