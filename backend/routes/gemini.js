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
        systemInstruction:
        `You are a scriptwriting assistant. Your task is to generate prompts for a script based on the provided text.
        You should provide a list of prompts that can be used to input into a text-to-image model.
        Ensure that prompts are clear, concise, and relevant to the text provided.
        The prompts should be a single sentence in the format of a list, with each prompt on a new line, with no dashes, bullet points, or asterisks at the start of each line.
        The prompts should be creative and imaginative, suitable for a script.
        The prompts should be descriptive and detailed, providing enough information for the text-to-image model to generate an image.
        Scripts will have a scene header, action lines, and dialogue. Your task is to generate prompts for each small section of the script, which you deem fit.
        The prompts should be relevant to the text provided and should not include any extraneous information.
        Do not generate extra text telling the user about what prompts you have generated. Just the prompts`,
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
        Each sentence should be on a separate line.
        Use INT./EXT. headers, action, character names, and dialogue but do NOT add any special characters.
        Do NOT add 'Idea', 'Scene', or 'Script:' labels.
        Just output raw script text.`,
        maxOutputTokens: 100,
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

