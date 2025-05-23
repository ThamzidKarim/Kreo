/*
 * Author: Thamzid Karim
 * Date: 4/5/2025
 *
 * Entry point for the backend server deifning the routes and starting the server.
 */

import express from "express";
import upload from "./routes/upload.js";
import prompts from "./routes/prompts.js";
import image from "./routes/image.js";
import video from "./routes/video.js";
import projects from "./routes/projects.js"; 
import cors from "cors";
import library from "./routes/library.js";
import forYouRoute from "./routes/foryou.js";




const app = express();
app.use(cors());

app.use(express.json()); 

app.use('/api', upload);
app.use('/api', prompts);
app.use('/api', image);
app.use('/api', video);
app.use('/api', projects);
app.use("/api", library);
app.use("/api", forYouRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});