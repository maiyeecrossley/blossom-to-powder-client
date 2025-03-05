import { useState, useEffect, useContext } from "react"
import { Navigate, useNavigate } from "react-router"
import { itineraryCreate } from "../../services/itineraryService"
import { UserContext } from "../../contexts/UserContext"

import styles from "./CreateItinerary.module.css"

export default function CreateItinerary() {

    const { user } = useContext(UserContext)

    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const [itineraryData, setItineraryData] = useState({
        trip_name: "",
        trip_start_date: "",
        trip_end_date: "",
    })

    useEffect(() => {
        if (!user) {
            navigate("/auth/login")
            return
        }
    }, [user, navigate])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (new Date(itineraryData.trip_start_date) > new Date(itineraryData.trip_end_date)) {
            setErrors({ date: "End date must be after the start date." })
            return
        }
        
        try {
            const newItinerary = await itineraryCreate(itineraryData)
            
            setItineraryData(newItinerary)
            setErrors({})
            navigate("/itineraries/", { state: { refresh: true } })
        } catch (error) {
            
            setErrors({ message: "Failed to create itinerary, please try again" })

        }
    }

    const handleChange = (event) => {
        setItineraryData({...itineraryData, [event.target.name]: event.target.value})
    }

    return (
        <section className={styles.container}>
            <h1>Create your itinerary!</h1>
            <form onSubmit={handleSubmit} className={styles.form}>

                <div className={styles.itineraryForm}>
                        <label htmlFor="trip_name">Trip Name:</label>
                        <input
                        type="text"
                        name="trip_name"
                        id="trip_name"
                        value={itineraryData.trip_name}
                        placeholder="My Japan Trip"
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className={styles.itineraryForm}>
                    <label htmlFor="trip_start_date">Trip Start Date:</label>
                    <input
                        type="date"
                        name="trip_start_date"
                        id="trip_start_date"
                        value={itineraryData.trip_start_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.itineraryForm}>
                    <label htmlFor="trip_end_date">Trip End Date:</label>
                    <input
                        type="date"
                        name="trip_end_date"
                        id="trip_end_date"
                        value={itineraryData.trip_end_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={itineraryData.trip_name === ""} className={styles.button}>
                    Create Itinerary
                </button>
            </form>
        </section>
    )
}



