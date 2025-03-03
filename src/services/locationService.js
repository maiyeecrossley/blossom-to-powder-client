import axios from "axios"
import { getToken } from "../utils/auth.js"

const BASE_URL = import.meta.env.VITE_API_URL


export const seasonLocationIndex = async (seasonId) => {
    
    try {
        const response = await axios.get(`${BASE_URL}/seasons/${seasonId}/locations/`)
        
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}