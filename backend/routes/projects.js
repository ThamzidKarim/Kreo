/**
 * Author: Thamzid Karim
 * Date: 15/5/2025
 *
 * Project routes: list and create projects in Postgres.
 */

import express from "express";
import { pool } from "../databasepg.js";

const router = express.Router();

// GET /api/projects — return all projects
router.get("/projects", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, project_image_url FROM projects ORDER BY created_at DESC"
    );
    res.json({ projects: result.rows });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST /api/projects — create a new project
router.post("/projects", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });

    const result = await pool.query(
      "INSERT INTO projects (title, created_at) VALUES ($1, NOW()) RETURNING id",
      [title]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
