import Multiselect from "multiselect-react-dropdown"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router"
import styles from "./LocationItem.module.css"

export default function LocationItem({
    location,
    itineraries,
    selectedItineraries,
    handleSelectChange,
    handleConfirmSelection,
    user

})
 {
    const noItineraries = itineraries.length === 0
    const isLoggedIn = !!user

return (
    
    <Card className={styles.locationCard}>
    <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text><p>{location.description}</p></Card.Text>

    
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
        placeholder="Add to itinerary"
        emptyRecordMsg="No itineraries created yet"
        className={styles.multiSelect}
        style={{
            multiselectContainer: { 
                width: "260px" 
            },
            chips: {
                background: "var(--autumn-leaf)"
            },
            searchBox: { 
                width: "100%",
                maxWidth: "200px",
                background: "var(--background-secondary)",
                border: "2px solid var(--border)",
                borderRadius: "8px",
            },
            optionContainer: { 
                background: "var(--background-primary)", 
                borderRadius: "8px", 
                padding: "5px" 
            },
            option: { 
                background: "var(--background-tertiary)", 
                color: "var(--text-primary)", 
                padding: "8px" 
            },
            highlightOption: { 
                background: "var(--cherry-blossom)", 
                color: "var(--text-primary)" 
            },
            inputField: { 
                color: "var(--text-secondary)" 
            },
            }}/>

                    {noItineraries && location.id === 1 && (
                    <p className={styles.noItineraries}>
                        {isLoggedIn 
                        
                        ? <div> 
                            No itineraries found. <Link to="/itineraries/create">Create one here!</Link>
                            </div>
                        : <div>
                            No itineraries found. <Link to="/auth/login">Login</Link> or <Link to="/auth/register">Sign up</Link> to create one!
                            </div>
                        }
                    </p>
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
