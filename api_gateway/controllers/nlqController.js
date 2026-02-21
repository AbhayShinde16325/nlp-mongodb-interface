const axios = require("axios");
const { NLP_SERVICE_URL } = require("../config/nlpconfig");

const handleNLQ = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        const response = await axios.post(NLP_SERVICE_URL, {
            query: query
        });

        return res.json(response.data);

    } catch (error) {
        console.error("NLP Service Error:", error.message);

        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    handleNLQ
};
