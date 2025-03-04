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

export const updateLocationVisitDate = async (locationId, visitDate) => {
    try {
        const response = await axios.patch(`${BASE_URL}/itineraries/${itineraryId}/edit`, locationId, visitDate, {
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
