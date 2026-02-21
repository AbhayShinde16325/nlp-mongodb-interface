import axios from "axios";

const API_URL = "http://localhost:5000/api/nlq";

export const sendQuery = async (query) => {
    const response = await axios.post(API_URL, { query });
    return response.data;
};
