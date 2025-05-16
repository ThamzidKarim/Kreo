/*
 * Author: Thamzid Karim
 * Date: 16/5/2025
 *
 * Defines the /generate-images route to handle image generation requests.
 */

import express from "express";
import { pool } from "../databasepg.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


const router = express.Router();

// POST /generate-images
router.post("/generate-images", async (req, res) => {
    try {
        const {text} = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }
        console.log("Received text:", text)

        // Call the generateImages function to generate prompts
        const response = await axios.post(
            'https://external.api.recraft.ai/v1/images/generations',
            {
                prompt: text,
                style: 'digital_illustration',
                size: '1024x1024',
                model: 'recraftv3',
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.RECRAFT_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Grab generated image URL
        const imageUrl = response.data?.data?.[0]?.url;
        if (!imageUrl) {
            return res.status(500).json({ error: "Image generation failed" });
        }

        // Query to insert prompt into prompts table
        const promptResult = await pool.query(
            "INSERT INTO prompts (prompt_text) VALUES ($1) RETURNING id",
            [text]
        )
        const promptId = promptResult.rows[0].id;

    
        // Query to insert values into db
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