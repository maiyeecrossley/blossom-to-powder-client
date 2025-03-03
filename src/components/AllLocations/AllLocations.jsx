import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { locationIndex } from "../../services/locationService"

export default function AllLocations() {

    const [locations, setLocations] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { locationId } = useParams()
    const { user } = useContext(UserContext)

    useEffect(() => {
        locationIndex(locationId)
            .then(data => setLocations(data))
            .catch(error => console.log("Error fetching locations", error))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <main>
            <section>
                {isLoading
                ? <p>Loading locations...</p>
                : locations.length > 0
                ? <ul>
                    {locations.map(location => (
                        <li key={location.id}>{location.name}</li>
                    ))}
                </ul>
                : <p>Location not found</p> 
                }
            </section>
        </main>
    )
}
