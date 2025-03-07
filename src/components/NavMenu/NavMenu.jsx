import { useState, useContext } from "react";
import { useNavigate } from "react-router"
import { Button, Navbar, Nav, Container } from "react-bootstrap"
import { removeToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";
import ModalComponent from "../ModalComponent/ModalComponent"
import Login from "../Login/Login"
import Register from "../Register/Register"
import AllLocations from "../AllLocations/AllLocations"

import styles from "./NavMenu.module.css"

export default function NavMenu() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const signOut = () => {
            removeToken()
            setUser(null)
            setTimeout(() => navigate('/'), 100)
        }


    return (
        <Navbar expand="lg" className="navbar-custom fixed-top">
            
                <Navbar.Brand href="/" className={styles.brandContainer}>
                <span className={styles.title}>Blossom to Powder</span>
                <span className={styles.tagline}>Wandering Japan's Four Seasons</span>
                </Navbar.Brand>
                    <div className={styles.navButtons}>
                        <Nav.Link href="/itineraries" className={styles.button}>My Trips</Nav.Link>
                        <Nav.Link href="/locations" className={styles.button}>Locations</Nav.Link>
                    </div>
                    <Nav>
                        {user 
                        ? <Button onClick={signOut} className={styles.button}>Logout</Button>
                        : <>
                            <Button onClick={() => setShowLogin(true)} className={styles.button}>Login</Button>
                            <Button onClick={() => setShowRegister(true)} className={styles.button}>Sign Up</Button>
                        </>
                        }
                    </Nav>
            

            <ModalComponent show={showLogin} handleClose={() => setShowLogin(false)} title="Login">
                <Login handleClose={() => setShowLogin(false)} />
            </ModalComponent>

            <ModalComponent show={showRegister} handleClose={() => setShowRegister(false)} title="Sign Up">
                <Register handleClose={() => setShowRegister(false)} />
            </ModalComponent>
            </Navbar>

    )
}