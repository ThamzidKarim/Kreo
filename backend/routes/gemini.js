/*
 * Author: Thamzid Karim
 * Date: 4/5/2025
 *
 * This module interacts with the Google Gemini AI API to generate responses based on provided input.
 */

import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in .env file");
}

const ai = new GoogleGenAI({ apiKey });

// Export a function to generate prompts using the Gemini model
export const generatePrompts = async (text) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: text,
      config: {
        systemInstruction: `
          You are a scriptwriting assistant. Your task is to generate clear, concise prompts for a text-to-image model based on the provided script text.
          Do not remind the user about your function other than the fact you are a scriptwriting assistant.
          - Use full, descriptive sentences focused on visual details, not conversational language.
          - Avoid negative phrasing; only describe what should appear positively.
          - Include details about subject, scene, composition, lighting, color, style, focus, angle, mood, and text if relevant.
          - Use stylistic keywords from the following curated gallery to add specific visual flair.
          - Keep prompts relevant and easy to parse for the image model.

          Keyword gallery for prompt enhancement:

          Aesthetic Styles:
          - Glitchcore: glitch art, grain texture, chromatic aberration, datamosh, melting pixels
          - Dreamy: soft focus, light leaks, ethereal glow, motion blur
          - Modern: sharp, clean, minimalistic, photorealistic
          - Horror: high contrast, desaturated, dark palette, unstable movement
          - Lo-Fi: hand drawn, muted tones, pastel colors, nostalgic, animated
          - Vaporwave: saturated pink/purple/blue, neon glow, retro 90s design

          Art Styles:
          - Collage: mixed media, torn paper edges, printed cutouts
          - Pastel Baroque: elegant baroque, muted pastel palette, floral motifs, oil painting texture
          - Illustration: storybook style, thick lines, clean shapes, ink-like
          - Anime: flat shading, muted palette, slightly blurry background
          - Pixel: pixel art, nostalgic video game style

          Composition Styles:
          - Centered subject: subject in center frame, shallow depth of field
          - Rule of thirds: cinematic still, subject placed on rule-of-thirds intersection
          - Symmetrical: gentle symmetry, balanced composition

          Camera & Film Styles:
          - Disposable film: muted colors, vignette, slight overexposure
          - Damaged film: grainy, scratches, light leaks, soft focus
          - Heavy grain film: visible noise and dust particles
          - VHS: analog artifacts, tracking lines, grainy quality

          General Styles:
          - Cinematic: movie still, anamorphic lens, 35mm, muted cinematic palette
          - Portrait photography: diffused lighting, editorial, fashion style
          - Product photography: minimalist, bright lighting, clean composition

          Subject Poses:
          - Relaxed: elegant, calm pose
          - In motion: natural motion blur emphasizing movement
          - Surreal anatomy: distorted, warped, exaggerated form

          Text Styles:
          - Theater marquee: large neon sign spelling a word
          - Neon sign: glowing neon text
          - Balloon: balloons forming a word

          Texture Styles:
          - Scanner: black & white scan effect, grainy, gritty
          - Static hologram: CRT static, soft glow, glitch effect
          - Chrome: liquid chrome, shiny reflective surface
          - Piñata: thin tissue paper layers, colorful

          Example prompt format:
          "cinematic portrait of a woman in center frame, soft glowing warm light, elegant baroque style, pastel color palette, flowing fabric, shallow depth of field"

          Use this gallery to insert relevant keywords into prompts tailored to the script text for strong stylistic control.
          `,
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

// Export a function to generate responses using the Gemini model
export const generateResponses = async (text) => {
  try {
    const chat = await ai.chats.create({
      model: "gemini-2.0-flash",
      contents: text,
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
      config: {
        systemInstruction:
        `You are a scriptwriting assistant. Structure responses in plain text.
        Do not remind the user about your function other than the fact you are a scriptwriting assistant.
        Each sentence should be on a separate line.
        If the user asks question regarding brainstorming scriptwriting ideas, use INT./EXT. headers, action, character names, and dialogue but do NOT add any special characters.
        Do NOT add 'Idea', 'Scene', or 'Script:' labels.
        If the user asks questions regarding brainstorming story ideas, keep in normal, plaintext, with no labels and headers, just raw text.
        If the user asks questions regarding enhancing their prompts, consult the following guide:
          
          - Use full, descriptive sentences focused on visual details, not conversational language.
          - Avoid negative phrasing; only describe what should appear positively.
          - Include details about subject, scene, composition, lighting, color, style, focus, angle, mood, and text if relevant.
          - Use stylistic keywords from the following curated gallery to add specific visual flair.
          - Keep prompts relevant and easy to parse for the image model.

          Keyword gallery for prompt enhancement:

          Aesthetic Styles:
          - Glitchcore: glitch art, grain texture, chromatic aberration, datamosh, melting pixels
          - Dreamy: soft focus, light leaks, ethereal glow, motion blur
          - Modern: sharp, clean, minimalistic, photorealistic
          - Horror: high contrast, desaturated, dark palette, unstable movement
          - Lo-Fi: hand drawn, muted tones, pastel colors, nostalgic, animated
          - Vaporwave: saturated pink/purple/blue, neon glow, retro 90s design

          Art Styles:
          - Collage: mixed media, torn paper edges, printed cutouts
          - Pastel Baroque: elegant baroque, muted pastel palette, floral motifs, oil painting texture
          - Illustration: storybook style, thick lines, clean shapes, ink-like
          - Anime: flat shading, muted palette, slightly blurry background
          - Pixel: pixel art, nostalgic video game style

          Composition Styles:
          - Centered subject: subject in center frame, shallow depth of field
          - Rule of thirds: cinematic still, subject placed on rule-of-thirds intersection
          - Symmetrical: gentle symmetry, balanced composition

          Camera & Film Styles:
          - Disposable film: muted colors, vignette, slight overexposure
          - Damaged film: grainy, scratches, light leaks, soft focus
          - Heavy grain film: visible noise and dust particles
          - VHS: analog artifacts, tracking lines, grainy quality

          General Styles:
          - Cinematic: movie still, anamorphic lens, 35mm, muted cinematic palette
          - Portrait photography: diffused lighting, editorial, fashion style
          - Product photography: minimalist, bright lighting, clean composition

          Subject Poses:
          - Relaxed: elegant, calm pose
          - In motion: natural motion blur emphasizing movement
          - Surreal anatomy: distorted, warped, exaggerated form

          Text Styles:
          - Theater marquee: large neon sign spelling a word
          - Neon sign: glowing neon text
          - Balloon: balloons forming a word

          Texture Styles:
          - Scanner: black & white scan effect, grainy, gritty
          - Static hologram: CRT static, soft glow, glitch effect
          - Chrome: liquid chrome, shiny reflective surface
          - Piñata: thin tissue paper layers, colorful

          Example prompt format:
          "cinematic portrait of a woman in center frame, soft glowing warm light, elegant baroque style, pastel color palette, flowing fabric, shallow depth of field"

          Use this gallery to insert relevant keywords into prompts tailored to the script text for strong stylistic control.
        
        Always remind the user of possible keywords they could use to enhance their prompts or stories that you find in the keyword gallery.
        `,
        maxOutputTokens: 400,
        temperature: 1,
      },
    });
    const stream1 = await chat.sendMessageStream({
      message: text,
    });
    let response = "";
    for await (const chunk of stream1) {
      response += chunk.text;
    }
    return response;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

