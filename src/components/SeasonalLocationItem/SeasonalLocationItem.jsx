import { Card, Button } from "react-bootstrap"
import ItineraryDropdown from "../ItineraryDropdown/ItineraryDropdown"
import styles from "../LocationItem/LocationItem.module.css" 

export default function SeasonalLocationItem({
    location,
    itineraries,
    selectedItineraries,
    handleSelectChange,
    handleConfirmSelection,
    user,
    triggerLoginModal,
    triggerRegisterModal
}) 

{
const imageUrl = location.location_image || "https://i.pinimg.com/736x/85/15/4e/85154e6d638b066d9b8a178c410d90c0.jpg"

    return (
        <Card className={styles.locationCard}>
            
            {location.location_image && (
                <Card.Img 
                    variant="top" 
                    src={imageUrl} 
                    alt={location.name} 
                    className={styles.locationImage}
                />
            )}

            <Card.Body>
                <Card.Title>{location.name}</Card.Title>
                <Card.Text>{location.description}</Card.Text>

                
                <ItineraryDropdown
                    itineraries={itineraries}
                    selectedItineraries={selectedItineraries}
                    locationId={location.id}
                    handleSelectChange={handleSelectChange}
                    user={user}
                    triggerLoginModal={triggerLoginModal}
                    triggerRegisterModal={triggerRegisterModal}
                />

                <Button 
                    className={styles.button} 
                    onClick={() => handleConfirmSelection(location.id)}>
                    Add to Itinerary
                </Button>
            </Card.Body>
        </Card>
    )
}