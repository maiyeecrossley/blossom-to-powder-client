import axios from "axios"
import { getToken } from "../utils/auth.js"

const BASE_URL = import.meta.env.VITE_API_URL


export const locationIndex = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/locations/`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const seasonLocationIndex = async (seasonId) => {
    
    try {
        const response = await axios.get(`${BASE_URL}/seasons/${seasonId}/locations/`)
        
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const addLocationVisitDate = async (itineraryId, locationId, visitDate) => {
    try {
        const response = await axios.post(`${BASE_URL}/itineraries/${itineraryId}/locations/`,
            { location_id: locationId, location_visit_date: visitDate || null },
            { headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateLocationVisitDate = async (itineraryId, locationId, visitDate) => {
    try {
        const response = await axios.patch(`${BASE_URL}/itineraries/${itineraryId}/locations/${locationId}/`, 
            { location_visit_date: visitDate },
            { headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const addLocationToItinerary = async (itineraryId, locationId, visitDate = null) => {
    try {
        const response = await axios.post(`${BASE_URL}/itineraries/${itineraryId}/locations/`,
            { location_id: locationId, location_visit_date: visitDate },
            { headers: { 
                Authorization: `Bearer ${getToken()}` 
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const removeLocationFromItinerary = async (itineraryId, locationId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/itineraries/${itineraryId}/locations/${locationId}/`, {
            headers: { 
                Authorization: `Bearer ${getToken()}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
