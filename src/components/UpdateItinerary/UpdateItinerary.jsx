import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate, useParams, Link } from "react-router"
import { itineraryUpdate, itineraryShow } from "../../services/itineraryService"

import styles from "./UpdateItinerary.module.css"

export default function UpdateItinerary() {

    const { itineraryId } = useParams()
    const { user } = useContext(UserContext)

    const [itineraryData, setItineraryData] = useState({
        trip_name: "",
        trip_start_date: "",
        trip_end_date: "",
    })
    
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/itineraries/")
            return
        }
        const getItinerary = async () => {
            try {
                const data = await itineraryShow(itineraryId)
                setItineraryData(data)
            } catch (error) {
                console.error(error)
                navigate("/itineraries/")
            }
        }
        getItinerary()
    }, [user, itineraryId, navigate])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (new Date(itineraryData.trip_start_date) > new Date(itineraryData.trip_end_date)) {
            setErrors({ date: "End date must be after the start date." })
            return;
        }

        try {
            await itineraryUpdate(itineraryId, itineraryData);
            navigate(`/itineraries/${itineraryId}`)
        } catch (error) {
            setErrors({ message: "Failed to update itinerary, please try again." })
        }
    }

    const handleChange = (event) => {
        setItineraryData({...itineraryData, [event.target.name]: event.target.value})
    }

    return (
        <main>
            <section className={styles.container}>
                <h1>Edit your itinerary</h1>
                <form onSubmit={handleSubmit} className={styles.form}> 
                    
                    <div className={styles.itineraryForm}>
                    <label htmlFor="trip_name">Trip Name:</label>
                    <input
                        type="text"
                        name="trip_name"
                        id="trip_name"
                        value={itineraryData.trip_name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="trip_start_date">Start Date:</label>
                    <input
                        type="date"
                        name="trip_start_date"
                        id="trip_start_date"
                        value={itineraryData.trip_start_date}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="trip_end_date">End Date:</label>
                    <input
                        type="date"
                        name="trip_end_date"
                        id="trip_end_date"
                        value={itineraryData.trip_end_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Link to={`/itineraries/`} className={styles.button}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.button}>
                        Update Itinerary
                    </button>
                </div>
                </form>
            </section>
        </main>
    )

}
