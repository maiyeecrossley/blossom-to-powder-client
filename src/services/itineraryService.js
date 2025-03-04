import axios from "axios"
import { getToken } from "../utils/auth"

const BASE_URL = import.meta.env.VITE_API_URL


export const itineraryIndex = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/itineraries/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        })
        return response.data
    } catch (error) {
        console.error("error fetching itineraries", error.response?.data || error)
        throw error
    }
}


export const itineraryShow = async (itineraryId) => {
    try {
        const response = await axios.get(`${BASE_URL}/itineraries/${itineraryId}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const itineraryCreate = async (itineraryData) => {
    try {
        const response = await axios.post(`${BASE_URL}/itineraries/create/`, itineraryData, {
            headers: { 
                Authorization: `Bearer ${getToken()}`,
            } 
        })
        return response.data;
    } catch (error) {
        console.log( error)
        throw error
    }
}

export const itineraryUpdate = async (itineraryId, itineraryData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/itineraries/${itineraryId}/edit/`, itineraryData, {
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

export const itineraryDelete = async (itineraryId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/itineraries/${itineraryId}/`, {
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
