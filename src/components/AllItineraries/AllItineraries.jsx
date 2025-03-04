import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router"
import { itineraryIndex } from "../../services/itineraryService"
import { UserContext } from "../../contexts/UserContext"

import styles from "./AllItineraries.module.css"

export default function AllItineraries() {

    const [itineraries, setItineraries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)
    const location = useLocation()

    useEffect(() => {
        if (!user) return 

        itineraryIndex()
        .then (data => setItineraries(data))
        .catch (error => console.log("Error getting itineraries", error))
        .finally(() => setIsLoading(false))
    }, [user, location.state])


    return (
        <main>
            <section>
                <h1>Your upcoming trips:</h1>

                <div>
                    <Link to={`/itineraries/create`} className={styles.button}>
                        Add new trip!
                    </Link>
                </div>
        
                {isLoading
                ? <p>Loading Itineraries...</p>
                : itineraries.length > 0
                ? itineraries.map((itinerary) => {
                    return (
                        
                        <Link to={`/itineraries/${itinerary.id}`} key={itinerary.id}>
                        <div className={styles.itineraryCard}>
                            <h3>{itinerary.trip_name}</h3>
                            <p>Start date: {new Date(itinerary.trip_start_date).toDateString()}</p>
                            <p>End date: {new Date(itinerary.trip_end_date).toDateString()}</p>
                                                        
                        </div>
                        </Link>
                    )
                })
                : <p>No itineraries found</p>
            }
            </section>
        </main>
    )

}