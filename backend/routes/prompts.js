/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 *
 * Defines the /generate-prompts route to handle prompt generation requests.
 */

import express from "express";
import { generatePrompts } from "./gemini.js";

const router = express.Router();


// POST /generate-prompts
router.post("/generate-prompts", async (req, res) => {
    try {
        const {text} = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }
        console.log("Received text:", text)

        // Call the generatePrompts function to generate prompts
        const response = await generatePrompts(text);
        const parsedResponse = response.split("\n").filter(line => line.trim() !== "");
        console.log("Generated content:", parsedResponse);
        return res.json({ message: "Prompts generated successfully", prompts: parsedResponse });
    } catch (error) {
        console.error("Error generating prompts:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

export default router;