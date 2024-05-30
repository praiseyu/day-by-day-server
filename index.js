require("dotenv").config();

const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}.`);
});