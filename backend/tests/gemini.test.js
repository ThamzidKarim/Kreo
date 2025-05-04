/*
 * Author: Thamzid Karim
 * Date: 4/5/2025
 *
 * Tests the Gemini AI by calling the generateContent function 
 * and logging the result to the console.
 */
import { generateContent } from "../routes/gemini.js";

// Calls generateContent with a test prompt and logs the result
const geminiTest = async () => {
    try {
        const response = await generateContent("What is the capital of France?");
        console.log("Gemini response:", response);
    } catch (error) {
        console.error("Error in Gemini test:", error);
    }
};

geminiTest();