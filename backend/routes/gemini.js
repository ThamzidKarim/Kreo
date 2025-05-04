/*
 * Author: Thamzid Karim
 * Date: 4/5/2025
 *
 * This module interacts with the Google Gemini AI API to generate content based on provided input.
 */

import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in .env file");
}

const ai = new GoogleGenAI({ apiKey });

// Export a function to generate content using the Gemini model
export const generateContent = async (contents) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

