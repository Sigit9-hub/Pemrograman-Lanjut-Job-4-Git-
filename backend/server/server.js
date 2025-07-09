const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
const API_KEY = "leutiss76";

app.use(cors());
app.use(express.json()); // Middleware untuk membaca body JSON

// Penyimpanan data di RAM
let sensorData = [];

// GET data terbaru
app.get("/api/data", (req, res) => {
  const key = req.query.apikey;
  if (key !== API_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid API key" });
  }
  res.json(sensorData);
});

// POST data baru
app.post("/api/data", (req, res) => {
  const key = req.query.apikey;
  if (key !== API_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid API key" });
  }

  const { temperature, humidity, pressure, wind, light } = req.body;
  if (
    temperature === undefined ||
    humidity === undefined ||
    pressure === undefined ||
    wind === undefined ||
    light === undefined
  ) {
    return res.status(400).json({ error: "Missing data fields" });
  }

  const newEntry = {
    temperature: parseFloat(temperature),
    humidity: parseFloat(humidity),
    pressure: parseFloat(pressure),
    wind: parseFloat(wind),
    light: parseFloat(light),
    timestamp: new Date().toISOString(),
  };

  sensorData.push(newEntry);
  res.status(201).json({ message: "Data saved", data: newEntry });
});

// Root halaman info
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>IoT API Server</title></head>
      <body style="font-family:sans-serif;background:#f3f4f6;padding:2rem">
        <h1>🚀 IoT API Server</h1>
        <p>Gunakan endpoint:</p>
        <ul>
          <li><code>GET /api/data?apikey=YOUR_KEY</code> untuk ambil semua data</li>
          <li><code>POST /api/data?apikey=YOUR_KEY</code> untuk kirim data baru</li>
        </ul>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
