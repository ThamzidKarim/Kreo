/**
 * Author: Thamzid Karim
 * Date: 15/5/2025
 *
 * Returns all generated images and videos.
 */

import express from "express";
import { pool } from "../databasepg.js";

const router = express.Router();


// GET /library endpoint to fetch all images and videos
router.get("/library", async (req, res) => {
  try {
    // Fetch images
    const imagesResult = await pool.query(
      "SELECT id, scene_id, prompt_id, image_url, created_at FROM images ORDER BY created_at DESC"
    );

    // Fetch videos
    const videosResult = await pool.query(
      "SELECT id, scene_id, video_url, duration, created_at FROM videos ORDER BY created_at DESC"
    );

    // Send JSON response containing arrays of images and videos
    res.json({
      images: imagesResult.rows,
      videos: videosResult.rows,
    });
  } catch (err) {
    console.error("Error fetching media:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
