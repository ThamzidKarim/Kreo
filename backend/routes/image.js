/*
 * Author: Thamzid Karim
 * Date: 12/5/2025
 *
 * Defines the /generate-images route to handle image generation requests.
 */

import express from "express";
import { pool } from "../databasepg.js";

const router = express.Router();

// POST /generate-images
router.post("/generate-images", async (req, res) => {
    try {
        const {text} = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }
        console.log("Received text:", text)

        // TODO: Call the generateImages function to generate prompts

        // Query to insert prompt into prompts table
        const promptResult = await pool.query(
            "INSERT INTO prompts (prompt_text) VALUES ($1) RETURNING id",
            [text]
        )
        const promptId = promptResult.rows[0].id;

        const imageUrl = "image.jpeg";
        // Query to insert values into db (test image)
        const result = await pool.query(
            "INSERT INTO images (image_url, prompt_id, created_at) VALUES ($1, $2, NOW()) RETURNING *",
            [imageUrl, promptId]
        )
        return res.json({ message: "Images generated successfully", imageUrl: result.rows[0].image_url, imageId: result.rows[0].id});
    } catch (error) {
        console.error("Error generating images:", error);
        return res.status(500).json({ error: "Server error" });
    }
});


export default router;