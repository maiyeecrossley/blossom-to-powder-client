import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { locationIndex, addLocationToItinerary } from "../../services/locationService"
import { itineraryIndex } from "../../services/itineraryService"

import Multiselect from "multiselect-react-dropdown"

import styles from "./AllLocations.module.css"

export default function AllLocations() {

    const [locations, setLocations] = useState([])
    const [itineraries, setItineraries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedItineraries, setSelectedItineraries] = useState({})
    const [openDropdown, setOpenDropdown] = useState(null)

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

    const handleSelectChange = (selectedList, locationId) => {
        setSelectedItineraries(prev => ({
            ...prev,
            [locationId]: selectedList.map(itinerary => itinerary.id),
        }));
    };
    
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
                ? <ul> {locations.map((location) => (
                    <li key={location.id}>{location.name}

                        <div className={styles.dropdownContainer}>
                        <Multiselect
                            options={itineraries}
                            selectedValues={itineraries.filter((itinerary) =>
                                selectedItineraries[location.id]?.includes(itinerary.id)
                            )}
                            onSelect={(selectedList) => handleSelectChange(selectedList, location.id)}
                            onRemove={(selectedList) => handleSelectChange(selectedList, location.id)}
                            displayValue="trip_name"
                            showCheckbox
                            className={styles.multiSelect}
                            style={{
                                multiselectContainer: { width: "260px" },
                                chips: {background: "var(--autumn-leaf"},
                                searchBox: { background: "var(--background-secondary)", border: "2px solid var(--border)", borderRadius: "8px" },
                                optionContainer: { background: "var(--background-primary)", borderRadius: "8px", padding: "5px" },
                                option: { background: "var(--background-tertiary)", color: "var(--text-primary)", padding: "8px" },
                                highlightOption: { background: "var(--cherry-blossom)", color: "var(--text-primary)" },
                                inputField: { color: "var(--text-secondary)" },
                                
                            }}
                        />
                            
                            <button className={styles.button} onClick={() => handleConfirmSelection(location.id)}>
                                Save
                            </button>
                        </div>
                    </li>
                ))}
                </ul>
                : <p>No locations available.</p>
                }
            </section>
        </main>
    )
}
