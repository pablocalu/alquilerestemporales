import axios from "axios"

export const getPlaces = async (name) => {
    try {
        const placeName = await axios.get(`/findplaces?name=${name}`)
        console.log(placeName)
    } catch (error) {
        throw error
    }
}