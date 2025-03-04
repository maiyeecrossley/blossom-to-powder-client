import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams } from "react-router"
import { itineraryShow } from "../../services/itineraryService"
import { UserContext } from "../../contexts/UserContext"

import styles from "./SingleItinerary.module.css"
import AllLocations from "../AllLocations/AllLocations"
import { updateLocationVisitDate } from "../../services/locationService"

export default function SingleItinerary() {

    const [itinerary, setItinerary] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [editLocationId, setEditLocationId] = useState(null)
    const [selectedDate, setSelectedDate] = useState("")

    const { itineraryId, locationId } = useParams()
    const { user } = useContext(UserContext)


    useEffect(() => {
        if (!itineraryId) return

        setIsLoading(true)
        itineraryShow(itineraryId)
            .then(data => {

                setItinerary(data)
            })
            .catch(error => {
                console.log("Error getting itinerary", error)
            })
            .finally(() => setIsLoading(false))
    }, [itineraryId])


    const handleDateSave = async (locationId) => {
        if (!selectedDate) return

        try {
            await updateLocationVisitDate(locationId, selectedDate)
        } catch (error) {
        }
    }

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

                                        {location.location_visit_date
                                            ? <p>Visit Date: {new Date(location.location_visit_date).toLocaleDateString("en-GB")}</p>
                                            : <div>
                                                {editLocationId === location.id
                                                    ?
                                                    <div>
                                                        <input
                                                            type="date"
                                                            value={selectedDate}
                                                            onChange={(e) => setSelectedDate(e.target.value)}
                                                        />
                                                        <button onClick={() => handleDateSave(location.id)}>Save</button>
                                                    </div>
                                                    : <button onClick={() => setEditLocationId(location.id)}>Add a Date</button>
                                                }
                                            </div>
                                        }
                                    </div>
                                ))
                                : <p>No locations added yet.</p>
                            }
                        </div>
                        :
                        <p>Itinerary not found</p>
                }
            </section>
        </main>

    )
}