import Multiselect from "multiselect-react-dropdown"
import styles from "./ItineraryDropdown.module.css"
import { Link } from "react-router"

export default function ItineraryDropdown({
    itineraries,
    selectedItineraries,
    locationId,
    handleSelectChange,
    user = null,
    triggerLoginModal, 
    triggerRegisterModal,
}) {
    const noItineraries = itineraries.length === 0;
    const isLoggedIn = !!user;
    
        return (
            <div className={styles.dropdownWrapper}>
                <div className={styles.dropdownContainer}>
                    {noItineraries 
                    ? 
                        <div className={styles.emptyDropdown}>
                            <p className={styles.noItinerariesText}>
                                {isLoggedIn 
                                ? 
                                <>No itineraries found. <button onClick={triggerRegisterModal} className={styles.link}>Create one here!</button></>
                                : 
                                <>No itineraries found. <button onClick={triggerLoginModal} className={styles.link}>Login</button> or <button onClick={triggerRegisterModal} className={styles.link}>Sign up</button> to create one!</>
                                }
                            </p>
                        </div>
                     : 
                        <Multiselect
                            options={itineraries}
                            selectedValues={itineraries.filter(itinerary =>
                                selectedItineraries[locationId]?.includes(itinerary.id)
                            )}
                            onSelect={selectedList => handleSelectChange(selectedList, locationId)}
                            onRemove={selectedList => handleSelectChange(selectedList, locationId)}
                            displayValue="trip_name"
                            showCheckbox
                            placeholder="Add to itinerary"
                            emptyRecordMsg="No itineraries available"
                            className={styles.multiSelect}
                            style={{
                                multiselectContainer: { width: "100%" },
                                chips: { background: "var(--autumn-leaf)" },
                                searchBox: {
                                    width: "100%",
                                    background: "var(--background-secondary)",
                                    border: "2px solid var(--border)",
                                    borderRadius: "8px",
                                    padding: "8px",
                                },
                                optionContainer: { 
                                    background: "var(--background-primary)", 
                                    borderRadius: "8px", 
                                    padding: "5px",
                                },
                                option: { 
                                    background: "var(--background-primary)", 
                                    color: "var(--text-primary)", 
                                    padding: "8px",
                                },
                                highlightOption: { 
                                    background: "var(--cherry-blossom)", 
                                    color: "var(--text-primary)",
                                },
                                inputField: { 
                                    color: "var(--text-secondary)",
                                },
                            }}
                        />
                    }
                </div>
            </div>
        )
    }