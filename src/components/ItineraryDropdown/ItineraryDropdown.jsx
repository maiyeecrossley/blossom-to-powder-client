import Multiselect from "multiselect-react-dropdown"
import styles from "./ItineraryDropdown.module.css"

export default function ItineraryDropdown({
    itineraries,
    selectedItineraries,
    locationId,
    handleSelectChange
}) {

    return (
        <Multiselect
            options={itineraries}
            selectedValues={itineraries.filter((itinerary) =>
                selectedItineraries[locationId]?.includes(itinerary.id) 
            )}
            onSelect={(selectedList) => handleSelectChange(selectedList, locationId)} 
            onRemove={(selectedList) => handleSelectChange(selectedList, locationId)} 
            displayValue="trip_name"
            showCheckbox
            placeholder="Add to itinerary"
            emptyRecordMsg="No itineraries created yet"
            className={styles.multiSelect}
            style={{
                multiselectContainer: { width: "260px" },
                chips: { background: "var(--autumn-leaf)" },
                searchBox: {
                    width: "100%",
                    maxWidth: "150px",
                    background: "var(--background-secondary)",
                    border: "2px solid var(--border)",
                    borderRadius: "8px",
                },
                optionContainer: { 
                    background: "var(--background-primary)", 
                    borderRadius: "8px", 
                    padding: "5px" },
                option: { 
                    background: "var(--background-primary)", 
                    color: "var(--text-primary)", 
                    padding: "8px" },
                highlightOption: { 
                    background: "var(--cherry-blossom)", 
                    color: "var(--text-primary)" },
                inputField: { 
                    color: "var(--text-secondary)" },
            }}
        />
    );
}


