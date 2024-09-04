const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactRoutes = require("./routes/contactRoutes");
const axios = require("axios");
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const {run} = require("./scripts/AiScript")
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads folder

// Use Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/contacts", contactRoutes);
app.get("/api/adivce/:country",async(req,res)=>{
    const text =await run(req.params.country);
    res.json(text)
})
const API_KEY = "5796abbde9106b7da4febfae8c44c232";
app.use("/api/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${
      lat || 33.8869
    }&lon=${lon || 9.5375}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);

    const { current, alerts } = response.data;

    const weatherInfo = {
      temperature: current.temp,
      weather: current.weather[0].description,
      alerts:
        alerts?.map((alert) => ({
          ...alert,
          start: new Date(alert.start),
          end: new Date(alert.end),
        })) || [],
    };

    res.status(200).json(weatherInfo);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch weather data", error: error.message });
  }
});

mongoose.connect('mongodb://localhost:27017/PIM3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 