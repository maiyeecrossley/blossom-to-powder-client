import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router"
import { itineraryDelete, itineraryShow } from "../../services/itineraryService"
import { addLocationVisitDate, updateLocationVisitDate, removeLocationFromItinerary } from "../../services/locationService"
import { UserContext } from "../../contexts/UserContext"

import styles from "./SingleItinerary.module.css"


export default function SingleItinerary() {

    const [itinerary, setItinerary] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [editLocationId, setEditLocationId] = useState(null)
    const [selectedDate, setSelectedDate] = useState("")

    const { itineraryId } = useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()


    useEffect(() => {
        if (!itineraryId) return

        setIsLoading(true)
        itineraryShow(itineraryId)
            .then(data => {
                if (data?.locations)
                    setItinerary(data)
            })
            .catch(error => {
                console.log("Error getting itinerary", error)
            })
            .finally(() => setIsLoading(false))
    }, [itineraryId])



    const handleDateSave = async (editLocationId, existingDate) => {
        if (!selectedDate) return

        try {
            let updatedItinerary
            if (!existingDate) {
                updatedItinerary = await addLocationVisitDate(itineraryId, editLocationId, selectedDate)
            } else {
                updatedItinerary = await updateLocationVisitDate(itineraryId, editLocationId, selectedDate)
            }


            setItinerary((prevItinerary) => ({
                ...prevItinerary,
                locations: prevItinerary.locations.map((location) =>
                    location.location?.id === editLocationId
                        ? { ...location, location_visit_date: selectedDate }
                        : location
                )
            }))

            setEditLocationId(null)
            setSelectedDate("")
        } catch (error) {
            console.error("Error updating date", error);
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("are you sure you want to delete this trip?")
        if (confirmDelete) {
            try {
                await itineraryDelete(itineraryId)
                navigate(`/itineraries/`)
            } catch (error) {
                console.log("failed to delete itinerary", error)
            }
        }
    }

    const handleRemoveLocation = async (locationId) => {
        const confirmRemove = window.confirm("Are you sure you want to remove this location?")
        if (!confirmRemove) return

        try {
            await removeLocationFromItinerary(itineraryId, locationId)
            setItinerary((prevItinerary) => ({...prevItinerary,
                locations: prevItinerary.locations.filter((location) => location.location.id !== locationId),
            }))

            const updatedItinerary = await itineraryShow(itineraryId)
            setItinerary(updatedItinerary)

            alert("Location removed successfully!")
        } catch (error) {
            console.error("Error removing location from itinerary:", error)
        }
    }

    return (
        <main>
            <section>
            <h1>Trip name: {itinerary?.trip_name}</h1>
                <h1>
                    {itinerary?.trip_start_date
                        ? new Date(itinerary.trip_start_date).toDateString()
                        : "Start date not set"} - {" "}
                    {itinerary?.trip_end_date
                        ? new Date(itinerary.trip_end_date).toDateString()
                        : "End date not set"}
                </h1>
                <div>
                    <Link to={`/itineraries/${itineraryId}/edit/`} className={styles.button}>
                        Edit your trip
                    </Link>
                    <button onClick={handleDelete} className={styles.button}>
                        Delete this trip
                    </button>
                </div>

                {isLoading
                    ? <p>Loading Locations...</p>
                    : itinerary
                        ? <div>
                            <h3>Locations:</h3>
                            {itinerary?.locations?.length > 0
                                ? itinerary.locations.map((locationData) => (
                                    <div key={locationData.id} className={styles.locationCard}>
                                        <h4>{locationData.location?.name}</h4>
                                        <p>{locationData.location?.description}</p>

                                        <p>Visit Date:{" "}
                                            {locationData.location_visit_date
                                                ? new Date(locationData.location_visit_date).toLocaleDateString("en-GB")
                                                : "No date set"}
                                        </p>

                                        {editLocationId === locationData.location.id
                                            ? <div>
                                                <input
                                                    type="date"
                                                    value={selectedDate}
                                                    onChange={(event) => setSelectedDate(event.target.value)} />
                                                <button onClick={() => handleDateSave(editLocationId, locationData.location_visit_date || null)}>
                                                    Save
                                                </button>

                                                <button onClick={() => setEditLocationId(null)}>
                                                    Cancel
                                                </button>
                                            </div>

                                            : locationData.location_visit_date
                                                ? <button onClick={() => {
                                                    setEditLocationId(locationData.location?.id)
                                                    setSelectedDate(locationData.location_visit_date || "")
                                                }}>
                                                    Edit date
                                                </button>

                                                : <button onClick={() => {
                                                    setEditLocationId(locationData.location?.id)
                                                    setSelectedDate("")}}>
                                                    Add visit date
                                                </button>
                                        }
                                            
                                            <button onClick={() => handleRemoveLocation(locationData.location.id)} className={styles.removeButton}>
                                                Remove Location
                                            </button>
                                    </div>
                                ))
                                : <div><p>No locations added yet! 
                                <Link to={`/locations/`} className={styles.button}>Browse where to go!</Link>
                                </p></div>
                            }
                        </div>
                        : <p>Itinerary not found</p>
                }
            </section>
        </main>
    )
}