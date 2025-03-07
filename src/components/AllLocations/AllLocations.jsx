import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { locationIndex, addLocationToItinerary } from "../../services/locationService"
import { itineraryIndex } from "../../services/itineraryService"
import { Container, Row } from "react-bootstrap"

import styles from "./AllLocations.module.css"
import LocationItem from "../LocationItem/LocationItem"

export default function AllLocations({ triggerLoginModal, triggerRegisterModal }) {

    const [locations, setLocations] = useState([])
    const [itineraries, setItineraries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedItineraries, setSelectedItineraries] = useState({})

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
                setIsLoading(false)
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


    const handleSelectChange = (selectedList, locationId) => {
        setSelectedItineraries(prev => ({...prev, [locationId]: selectedList.map(itinerary => itinerary.id),
        }))
    }
    
    const handleConfirmSelection = async (locationId) => {
        const selectedIds = selectedItineraries[locationId] || [];
        if (!selectedIds.length) return;
    
        try {
            await Promise.all(selectedIds.map(id => addLocationToItinerary(id, locationId, null)));
            alert("Location added successfully!");
        } catch (error) {
            console.error("Error adding location:", error);
        }
    };

    return (
        <main>
            <section>
                <h1>All Locations</h1>
                
                {isLoading 
                ? <p>Loading locations...</p>
                : locations.length > 0 
                ? <Container>
                    <Row>
                        {locations.map((location) => (
                                <LocationItem
                                    key={location.id}
                                    location={location}
                                    itineraries={itineraries}
                                    selectedItineraries={selectedItineraries}
                                    handleSelectChange={handleSelectChange}
                                    handleConfirmSelection={handleConfirmSelection}
                                    user={user}
                                    triggerLoginModal={triggerLoginModal}
                                    triggerRegisterModal={triggerRegisterModal} />
                ))}
                </Row>
                </Container>
                : <p>No locations available.</p>
                }
            </section>
        </main>
    )
}
