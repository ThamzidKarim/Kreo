/**
 * Author: Thamzid Karim
 * Date: 15/5/2025
 *
 * Returns all shared images and videos with like counts and like status for a given user.
 */

import express from "express";
import { pool } from "../databasepg.js";

const router = express.Router();

// GET shared images/videos + like counts + whether user liked them
router.get("/foryou", async (req, res) => {
  const userId = parseInt(req.query.user_id); 
  try {
    // For each shared image, fetch its id and url, count total likes, and check if the current user liked it, showing newest images first.
    const images = await pool.query(`
        SELECT 
        i.id, 
        i.image_url,
        -- Count likes for this image
        (SELECT COUNT(*) FROM likes WHERE media_type = 'image' AND media_id = i.id) AS like_count,
        -- Check if the current user liked this image
        EXISTS (
            SELECT 1 FROM likes WHERE media_type = 'image' AND media_id = i.id AND user_id = $1
        ) AS liked
        FROM images i
        JOIN shared_media s ON s.media_type = 'image' AND s.media_id = i.id
        ORDER BY i.created_at DESC;
    `, [userId]);

   // For each shared video, fetch its id and url, count total likes, and check if the current user liked it, showing newest videos first.
    const videos = await pool.query(`
        SELECT 
        v.id, 
        v.video_url,
        -- Count likes for this video
        (SELECT COUNT(*) FROM likes WHERE media_type = 'video' AND media_id = v.id) AS like_count,
        -- Check if the current user liked this video
        EXISTS (
            SELECT 1 FROM likes WHERE media_type = 'video' AND media_id = v.id AND user_id = $1
        ) AS liked
        FROM videos v
        JOIN shared_media s ON s.media_type = 'video' AND s.media_id = v.id
        ORDER BY v.created_at DESC;
    `, [userId]);

    res.json({ images: images.rows, videos: videos.rows });
  } catch (err) {
    console.error("Error fetching for you feed:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST like/unlike toggle
router.post("/like", async (req, res) => {
  const { media_type, media_id, user_id } = req.body;

  try {
    // Check if user already liked
    const check = await pool.query(`
      SELECT 1 FROM likes WHERE media_type = $1 AND media_id = $2 AND user_id = $3
    `, [media_type, media_id, user_id]);

    if (check.rowCount > 0) {
      // Unlike
      await pool.query(`
        DELETE FROM likes WHERE media_type = $1 AND media_id = $2 AND user_id = $3
      `, [media_type, media_id, user_id]);
      return res.json({ liked: false });
    } else {
      // Like
      await pool.query(`
        INSERT INTO likes (media_type, media_id, user_id) VALUES ($1, $2, $3)
      `, [media_type, media_id, user_id]);
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
