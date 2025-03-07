import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { seasonLocationIndex } from "../../services/locationService"
import { itineraryIndex } from "../../services/itineraryService"
import SeasonalLocationItem from "../SeasonalLocationItem/SeasonalLocationItem"

import styles from "../LocationItem/LocationItem.module.css" 

export default function SeasonalLocations() {
    const [locations, setLocations] = useState([])
    const [season, setSeason] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [itineraries, setItineraries] = useState([])
    const [selectedItineraries, setSelectedItineraries] = useState({})

    const { seasonId } = useParams()

    useEffect(() => {
        if (!seasonId) return

        seasonLocationIndex(seasonId)
            .then(data => {
                setSeason(data)
                setLocations(data.seasonal_locations || [])
            })
            .catch(error => console.log("Error fetching locations", error))
            .finally(() => setIsLoading(false))
    }, [seasonId])

    useEffect(() => {
        itineraryIndex()
            .then(data => setItineraries(data))
            .catch(error => console.log("Error fetching itineraries", error))
    }, [])

    const handleSelectChange = (selectedList, locationId) => {
        setSelectedItineraries(prevState => ({prevState, [locationId]: selectedList.map(itinerary => itinerary.id)
        }))
    }

    const handleConfirmSelection = (locationId) => {
        console.log("Selected Itineraries for location:", locationId, selectedItineraries[locationId])
    }

    return (
        <main className={styles.seasonMain}>
            {isLoading 
                ? <p>Loading locations...</p>
                : season 
                    ? <>
                        <h2 className={styles.seasonTitle}>{season.name}</h2>
                        <p className={styles.seasonDescription}>{season.description}</p>
                        <div className={styles.seasonalLocation}>

                        <Link to={`/`} className={styles.button}>Back to other seasons</Link>
                        <Link to={`/locations/`} className={styles.button}>View other locations</Link>
                        </div>

                        {locations.length > 0 
                            ? <div className={styles.locationsContainer}>
                                {locations.map((location) => (
                                    <SeasonalLocationItem 
                                        key={location.id}
                                        location={location}
                                        itineraries={itineraries}
                                        selectedItineraries={selectedItineraries}
                                        handleSelectChange={handleSelectChange}
                                        handleConfirmSelection={handleConfirmSelection}
                                    />
                                ))}
                            </div>
                            : <p>No locations found for this season.</p>
                        }
                    </>
                    : <p>Season not found.</p>
            }
        </main>
    )
}