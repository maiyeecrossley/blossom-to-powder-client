import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router"
import { itineraryDelete, itineraryShow } from "../../services/itineraryService"
import { addLocationVisitDate, updateLocationVisitDate, removeLocationFromItinerary } from "../../services/locationService"
import { UserContext } from "../../contexts/UserContext"
import ModalComponent from "../ModalComponent/ModalComponent"
import UpdateItinerary from "../UpdateItinerary/UpdateItinerary"
import SingleItineraryLocationItem from "../SingleItineraryLocationItem/SingleItineraryLocationItem"

import styles from "./SingleItinerary.module.css"

export default function SingleItinerary() {
    const [itinerary, setItinerary] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [editLocationId, setEditLocationId] = useState(null)
    const [selectedDate, setSelectedDate] = useState("")
    const [showEditModal, setShowEditModal] = useState(false)

    const { itineraryId } = useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    
    useEffect(() => {
        if (!itineraryId) return
        setIsLoading(true)

        itineraryShow(itineraryId)
            .then(data => {
                if (data?.locations) setItinerary(data)
            })
            .catch(error => console.log("Error getting itinerary", error))
            .finally(() => setIsLoading(false))
    }, [itineraryId])

    
    const handleDateSave = async (editLocationId, newSelectedDate, existingDate) => {
    
        if (!newSelectedDate) {
            return;
        }
    
        try {
            let updatedItinerary;
            if (existingDate) {
                
                updatedItinerary = await updateLocationVisitDate(itineraryId, editLocationId, newSelectedDate);
            } else {
                updatedItinerary = await addLocationVisitDate(itineraryId, editLocationId, newSelectedDate);
            }
            const refreshedItinerary = await itineraryShow(itineraryId);
            setItinerary(refreshedItinerary);
    
            setEditLocationId(null);
            setSelectedDate("");
        } catch (error) {
            console.error(error)
        }
    }

    
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this trip?")) return

        try {
            await itineraryDelete(itineraryId)
            navigate(`/itineraries/`)
        } catch (error) {
            console.log("Failed to delete itinerary", error)
        }
    }
    
    const handleRemoveLocation = async (locationId) => {
        if (!window.confirm("Are you sure you want to remove this location?")) return

        try {
            await removeLocationFromItinerary(itineraryId, locationId)

            setItinerary(prevItinerary => ({
                ...prevItinerary,
                locations: prevItinerary.locations.filter(location => location.location.id !== locationId)
            }))

            const updatedItinerary = await itineraryShow(itineraryId)
            setItinerary(updatedItinerary)

            alert("Location removed successfully!")
        } catch (error) {
            console.error("Error removing location from itinerary:", error)
        }
    }

    const refreshItinerary = async () => {
        setIsLoading(true);
        try {
            const updatedData = await itineraryShow(itineraryId)
            setItinerary(updatedData)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className={styles.singleItineraryContainer}>
            <section>
                <h1 className={styles.itineraryTitle}>Trip Name: {itinerary?.trip_name}</h1>
                <h2 className={styles.itineraryDates}>
                    {itinerary?.trip_start_date
                        ? new Date(itinerary.trip_start_date).toDateString()
                        : "Start date not set"}{" "}-{" "}
                    {itinerary?.trip_end_date
                        ? new Date(itinerary.trip_end_date).toDateString()
                        : "End date not set"}
                </h2>

                
                <div className={styles.buttonContainer}>
                    <button onClick={() => setShowEditModal(true)} className={styles.button}>
                        Edit Trip
                    </button>

                    <button onClick={handleDelete} className={styles.button}>
                        Delete Trip
                    </button>
                </div>

                
                {isLoading 
                ? <p className={styles.loadingText}>Loading Locations...</p>
                : itinerary 
                ? <div className={styles.locationsContainer}>
                        <h2 className={styles.locationsHeading}>Locations:</h2>
                        {itinerary?.locations?.length > 0 
                        ? itinerary.locations.map(locationData => (
                          
                            <SingleItineraryLocationItem
                                    key={locationData.location.id}
                                    locationData={locationData}
                                    handleDateSave={handleDateSave}
                                    handleRemoveLocation={handleRemoveLocation}
                                    setEditLocationId={setEditLocationId}
                                    editLocationId={editLocationId}
                                />
                            ))
                        : <div className={styles.noLocations}>
                                <span>No locations added yet!{" "}</span>
                                    <Link to={`/locations/`} className={styles.locationButton}>Browse where to go!</Link>
                            </div>
                        }
                    </div>
                : <p className={styles.errorText}>Itinerary not found</p>
                }

            </section>

            
            <ModalComponent show={showEditModal} handleClose={() => setShowEditModal(false)} title="Edit Itinerary">
                <UpdateItinerary itineraryId={itineraryId} handleClose={() => setShowEditModal(false)} refreshItinerary={refreshItinerary} />
            </ModalComponent>
        </main>
    )
}