import { useState } from "react"
import { Card, Button } from "react-bootstrap"
import styles from "./SingleItineraryLocationItem.module.css"

export default function SingleItineraryLocationItem({ locationData, handleDateSave, handleRemoveLocation, setEditLocationId, editLocationId }) {
    const [selectedDate, setSelectedDate] = useState("")

    const { location } = locationData

    
    const imageUrl = location?.location_image || "https://i.pinimg.com/736x/85/15/4e/85154e6d638b066d9b8a178c410d90c0.jpg"

    return (
        <Card className={styles.locationCard}>
            
            <Card.Img variant="top" src={imageUrl} alt={location?.name} className={styles.locationImage} />

            <Card.Body>
                <Card.Title className={styles.locationTitle}>{location?.name}</Card.Title>
                <Card.Text className={styles.locationDescription}>{location?.description}</Card.Text>

                <p className={styles.visitDate}>
                    Visit Date: {locationData.location_visit_date
                        ? new Date(locationData.location_visit_date).toLocaleDateString("en-GB")
                        : "No date set"}
                </p>

                {editLocationId === location.id 
                ? <div className={styles.datePickerContainer}>
                        <input
                            type="date"
                            className={styles.dateInput}
                            value={selectedDate}
                            onChange={(event) => setSelectedDate(event.target.value)}
                        />
                        <Button
                            variant="success"
                            onClick={() => handleDateSave(location.id, locationData.location_visit_date || null)}
                            className={styles.saveButton}
                        >
                            Save
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setEditLocationId(null)}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                    </div>
                 : 
                    <Button
                        variant="info"
                        onClick={() => {
                            setEditLocationId(location.id)
                            setSelectedDate(locationData.location_visit_date || "")
                        }}
                        className={styles.button}
                    >
                        {locationData.location_visit_date ? "Edit Date" : "Add Visit Date"}
                    </Button>
                }

                <Button
                    variant="danger"
                    onClick={() => handleRemoveLocation(location.id)}
                    className={styles.removeButton}
                >
                    Remove Location
                </Button>
            </Card.Body>
        </Card>
    )
}