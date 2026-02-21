require("dotenv").config();
const express = require("express");
const cors = require("cors");

const nlqRoutes = require("./routes/nlqRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/nlq", nlqRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "API Gateway running" });
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
