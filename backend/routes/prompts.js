/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 *
 * Defines the /generate-prompts route to handle prompt generation requests.
 */

import express from "express";

const router = express.Router();


// POST /generate-prompts
router.post("/generate-prompts", (req, res) => {
    try {
        const {text} = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }
        console.log("Received text:", text)
        res.json({ message: "Prompts generated successfully", prompts: ["Prompt 1", "Prompt 2"] }); // Mock response
    } catch (error) {
        console.error("Error generating prompts:", error);
        res.status(500).json({ error: "Server error" });
}
});

export default router;