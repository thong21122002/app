import axios from "axios"

export const createReview = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/review/create`, data)
    return res.data
}
