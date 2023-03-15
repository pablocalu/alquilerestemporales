import axios from "axios"

export const getPlaces = async (name) => {
    try {
        const placeName = await axios.get(`/findplaces?name=${name}`)
        return placeName.data
    } catch (error) {
        throw error
    }
}