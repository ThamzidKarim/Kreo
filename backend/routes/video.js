/*
 * Author: Thamzid Karim
 * Date: 16/2025
 *
 * Defines the /generate-videos route to handle video generation requests.
 */

import express from "express";
import { pool } from "../databasepg.js";
import RunwayML from "@runwayml/sdk";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const client = new RunwayML({
    apiKey: process.env.RUNWAY_API_KEY
});

// POST /generate-videos
router.post("/generate-videos", async (req, res) => {
    try {
        const {imageId } = req.body;
        if (!imageId ) {
            return res.status(400).json({ error: "Image is required" });
        }
        console.log("Received image:", imageId )

        // Get imageUrl from db
        const imageResult = await pool.query("SELECT image_url FROM images WHERE id = $1", [imageId]);
        if (imageResult.rowCount === 0) {
        return res.status(404).json({ error: "Image not found" });
        }
        const promptImage = imageResult.rows[0].image_url;
        console.log("Using image URL for video generation:", promptImage);

        // Call the function to generate images
        const imageToVideo = await client.imageToVideo.create({
        model: "gen4_turbo",
        promptImage: {
            uri: promptImage,   
            position: "first"
        },
        promptText: "Generate a video from this image",
        ratio: "1280:720",    
        duration: 5        
        });


        const taskId = imageToVideo.id;
        console.log("Runway task created with ID:", taskId);

        // Poll for task completion
        let task;
        do {
        await new Promise((r) => setTimeout(r, 10000)); // wait 10 seconds
        task = await client.tasks.retrieve(taskId);
        console.log("Runway task status:", task.status);
        } while (!["SUCCEEDED", "FAILED"].includes(task.status));

        if (task.status === "FAILED") {
        return res.status(500).json({ error: "Runway video generation failed" });
        }

        // Task succeeded, get output video URL
        const videoUrl = task.outputs[0]?.uri;

        if (!videoUrl) {
        return res.status(500).json({ error: "No video URL returned from Runway" });
        }

        // Query to insert values into db
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