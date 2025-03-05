import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { locationIndex, addLocationToItinerary } from "../../services/locationService"
import { itineraryIndex } from "../../services/itineraryService"

import { Dropdown } from "react-bootstrap"

import styles from "./AllLocations.module.css"

export default function AllLocations() {

    const [locations, setLocations] = useState([])
    const [itineraries, setItineraries] = useState([])
    const [selectedItinerary, setSelectedItinerary] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const { locationId } = useParams()
    const { user } = useContext(UserContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationData = await locationIndex()
                setLocations(locationData)

                if (user) {
                    const itineraryData = await itineraryIndex()
                    setItineraries(itineraryData)
                }
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading
                }
            }
            fetchData()
        }, [user])

        useEffect(() => {
        locationIndex(locationId)
            .then(data => setLocations(data))
            .catch(error => console.log("Error fetching locations", error))
            .finally(() => setIsLoading(false))
    }, [])

    const handleAddLocation = async (itineraryId, locationId) => {
        if (!itineraryId) return
    
        try {
            await addLocationToItinerary(itineraryId, locationId, null)
            alert("Location added successfully!")
        } catch (error) {
            console.error("Error adding location to itinerary:", error)
        }
    }

    return (
        <main>
            <section>
                <h1>Available Locations</h1>
                {isLoading 
                ? <p>Loading locations...</p>
                : locations.length > 0 
                ? <ul>
                    {locations.map((location) => (
                        <li key={location.id}>
                            {location.name}
                            
                            <Dropdown onSelect={(itineraryId) => handleAddLocation(itineraryId, location.id)} className={styles.dropdownContainer}>
                            <Dropdown.Toggle className={styles.dropdownToggle} variant="primary" id={`dropdown-${location.id}`}>
                                Add to Itinerary
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={styles.dropdownMenu}>
                                {itineraries.length > 0 
                                ?   itineraries.map((itinerary) => (
                                    <Dropdown.Item key={itinerary.id} eventKey={itinerary.id} className={styles.dropdownItem}>
                                        {itinerary.trip_name}
                                    </Dropdown.Item>
                             ))
                                :   <Dropdown.Item disabled>No itineraries found
                                    </Dropdown.Item>
                                }
                            </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    ))}
                </ul>
                : <p>No locations available.</p>
            }
            </section>
        </main>
    )
}
