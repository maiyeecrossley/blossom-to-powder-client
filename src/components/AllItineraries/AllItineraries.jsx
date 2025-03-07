import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router"
import { itineraryIndex } from "../../services/itineraryService"
import { UserContext } from "../../contexts/UserContext"
import ModalComponent from "../ModalComponent/ModalComponent"
import CreateItinerary from "../CreateItinerary/CreateItinerary"

import styles from "./AllItineraries.module.css"
import Login from "../Login/Login"

export default function AllItineraries() {

    const [itineraries, setItineraries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const { user } = useContext(UserContext)
    const location = useLocation()

    const fetchItineraries = () => {
        if (!user) return;
        setIsLoading(true);
        itineraryIndex()
            .then(data => setItineraries(data))
            .catch(error => console.log("Error getting itineraries", error))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        fetchItineraries();
    }, [user, location.state]);


    return (
        <main>
            <section>
                <h1>Your upcoming trips:</h1>


                <button onClick={() => setShowCreateModal(true)} className={styles.button}>
                    + Add New Trip
                </button>


                <ModalComponent show={showCreateModal} handleClose={() => setShowCreateModal(false)} title="Create Itinerary">
                    <CreateItinerary
                        handleClose={() => setShowCreateModal(false)}
                        triggerLoginModal={() => setShowLogin(true)}
                    />
                </ModalComponent>

                <ModalComponent show={showLogin} handleClose={() => setShowLogin(false)} title="Login">
                    <Login handleClose={() => setShowLogin(false)} />
                </ModalComponent>

                {isLoading 
                ?
                    <p className={styles.loadingText}>Loading Itineraries...</p>
                : itineraries.length > 0 
                ? 
                    <div className={styles.itineraryGrid}>
                        {itineraries.map((itinerary) => (
                            <Link to={`/itineraries/${itinerary.id}`} key={itinerary.id} className={styles.itineraryLink}>
                                <div className={styles.itineraryCard}>
                                    <h3 className={styles.itineraryTitle}>{itinerary.trip_name}</h3>
                                    <p className={styles.itineraryDate}>
                                        <strong>Start date:</strong> {new Date(itinerary.trip_start_date).toDateString()}
                                    </p>
                                    <p className={styles.itineraryDate}>
                                        <strong>End date:</strong> {new Date(itinerary.trip_end_date).toDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                : <p className={styles.noItineraries}>No itineraries found</p>
                }
            </section>
        </main>
    )

}