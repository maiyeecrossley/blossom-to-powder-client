import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { seasonLocationIndex } from "../../services/locationService"

export default function SeasonalLocations() {

    const [locations, setLocations] = useState([])
    const [season, setSeason] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { seasonId } = useParams()

    useEffect(() => {
        if (!seasonId) return
        
        seasonLocationIndex(seasonId)
            .then(data => {
                setSeason(data)
                setLocations(data.seasonal_locations || [])
            })
            .catch(error => console.log("Error fetching locations", error))
            .finally(() => {
                
                setIsLoading(false)
    })
    }, [seasonId])

    return (
        <main>
            {isLoading 
            ? <p>Loading locations...</p>
            : season 
            ? 
                <>
                    <h2>{season.name}</h2>
                    <p>{season.description}</p>

                    {locations.length > 0 
                    ? <ul>
                        {locations.map((location) => (
                            <li key={location.id}>
                                <h3>{location.name}</h3>
                                <p>{location.description}</p>
                            </li>
                        ))}
                    </ul>
                    : <p>No locations found for this season.</p>
                    }
                </>
            : <p>Season not found.</p>
            }
        </main>
    )
}
