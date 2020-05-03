const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const envResult = require("dotenv").config();

if (envResult.error) {
  console.error(envResult.error);
  process.exit(1);
}

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.get("/weather_forecast/:lat/:lon", (req, res) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
  )
    .then((response) => response.json())
    .then((result) => res.send(result))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening in PORT: ${PORT}`));
