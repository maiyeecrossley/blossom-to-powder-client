import { Card, Button } from "react-bootstrap"
import { Link } from "react-router"
import styles from "./LocationItem.module.css"
import ItineraryDropdown from "../ItineraryDropdown/ItineraryDropdown"

export default function LocationItem({
    location,
    itineraries,
    selectedItineraries,
    handleSelectChange,
    handleConfirmSelection,
    user

}) {
    const noItineraries = itineraries.length === 0
    const isLoggedIn = !!user

    return (

        <Card className={styles.locationCard}>
            <Card.Body>
                <Card.Title>{location.name}</Card.Title>
                <Card.Text>{location.description}</Card.Text>
                <div className={styles.dropdownContainer}>

                    <ItineraryDropdown
                        itineraries={itineraries}
                        selectedItineraries={selectedItineraries}
                        locationId={location.id}
                        handleSelectChange={handleSelectChange}
                    />

                    {noItineraries && location.id === 1 && (
                        <div className={styles.noItineraries}>
                            {isLoggedIn

                                ? <div>
                                    No itineraries found. <Link to="/itineraries/create">Create one here!</Link>
                                </div>
                                : <div>
                                    No itineraries found. <Link to="/auth/login">Login</Link> or <Link to="/auth/register">Sign up</Link> to create one!
                                </div>
                            }
                        </div>
                    )}

                    {!noItineraries && (
                        <button className={styles.button} onClick={() => handleConfirmSelection(location.id)}>
                            Save
                        </button>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}
