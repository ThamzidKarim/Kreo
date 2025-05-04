/*
 * Author: Thamzid Karim
 * Date: 4/5/2025
 *
 * Defines the /upload route to handle file uploads using Multer.
 * Currently, it stores uploaded files in the "uploads" directory.
 */

import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /upload — handles single file upload and returns metadata
router.post("/upload", upload.single("file"), (req, res) => {
  if(!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json(req.file); 
});

export default router; 