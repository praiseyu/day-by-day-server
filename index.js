require("dotenv").config();
const express = require("express");
const cors = require("cors");
const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes");

const app = express();
const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/", publicRoutes);
app.use("/api", privateRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}.`);
});