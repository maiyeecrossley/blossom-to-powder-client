import { Card } from "react-bootstrap"
import ItineraryDropdown from "../ItineraryDropdown/ItineraryDropdown"
import styles from "../LocationItem/LocationItem.module.css"

export default function SeasonalLocationItem({
    location,
    itineraries,
    selectedItineraries,
    handleSelectChange,
    handleConfirmSelection,
}) {
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
                        handleSelectChange={handleSelectChange}/>
                    <button 
                        className={styles.button} 
                        onClick={() => handleConfirmSelection(location.id)}>
                        Save
                    </button>
                </div>
            </Card.Body>
        </Card>
    )
}