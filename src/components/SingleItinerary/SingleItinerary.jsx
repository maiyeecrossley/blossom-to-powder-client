import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams } from "react-router"
import { itineraryShow } from "../../services/itineraryService"
import { UserContext } from "../../contexts/UserContext"

import styles from "./SingleItinerary.module.css"
import AllLocations from "../AllLocations/AllLocations"

export default function SingleItinerary() {

    const [itinerary, setItinerary] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { itineraryId } = useParams()
    const { user } = useContext(UserContext)


    useEffect(() => {
        if (!itineraryId) return

        setIsLoading(true)
        itineraryShow(itineraryId)
            .then(data => {
                console.log("fetched itinerary", data)
                setItinerary(data)
            })
            .catch(error => {
                console.log("Error getting itinerary", error)
            })
            .finally(() => setIsLoading(false))
    }, [itineraryId])


    return (
        <main>
            <section>
                <h1>My Itinerary: {itinerary?.trip_start_date 
                ? new Date(itinerary.trip_start_date).toDateString()
                : "Start date not set"} - 
                    {itinerary?.trip_end_date 
                ? new Date(itinerary.trip_end_date).toDateString() 
                : "End date not set"}</h1>

                {isLoading
                    ? <p>Loading Locations...</p>
                    : itinerary 
                    ? <div>
                        <h3>Locations:</h3>
                        {itinerary.locations.length > 0
                            ? itinerary.locations.map((location) => (
                                <div key={location.id} className={styles.locationCard}>
                                    <h4>{location.name}</h4>
                                    <p>{location.description}</p>
                                    <p>Visit Date: {location.location_visit_date}</p>
                                </div>
                            ))
                            : <p>No locations added yet.</p>
                        }
                    </div>
                    : <p>Itinerary not found</p>
                }
            </section>
        </main>
    )
}