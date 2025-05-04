/*
 * Author: Thamzid Karim
 * Date: 4/5/2025
 *
 * Entry point for the backend server deifning the routes and starting the server.
 */

import express from "express";
import upload from "./routes/upload.js";

const app = express();

app.use('/api', upload);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});