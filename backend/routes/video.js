/*
 * Author: Thamzid Karim
 * Date: 12/5/2025
 *
 * Defines the /generate-videos route to handle video generation requests.
 */

import express from "express";
import { pool } from "../databasepg.js";

const router = express.Router();

// POST /generate-videos
router.post("/generate-videos", async (req, res) => {
    try {
        const {imageId } = req.body;
        if (!imageId ) {
            return res.status(400).json({ error: "Image is required" });
        }
        console.log("Received image:", imageId )

        // TODO: Call the generateVideos function to generate images

        const videoUrl = "video.mp4";

        // Query to insert values into db (test image)
        const result = await pool.query(
            "INSERT INTO videos (image_id, video_url, created_at) VALUES ($1, $2, NOW()) RETURNING *",
            [imageId , videoUrl]
        )
        return res.json({ message: "Videos generated successfully", videoUrl: result.rows[0].video_url});
    } catch (error) {
        console.error("Error generating videos:", error);
        return res.status(500).json({ error: "Server error" });
    }
});


export default router;