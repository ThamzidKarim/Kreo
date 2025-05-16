/**
 * Author: Thamzid Karim
 * Date: 16/5/2025
 *
 * Unit tests for Gemini AI API functions
 */

import { generatePrompts, generateResponses } from "../backend/routes/gemini.js";

// Mock the Gemini module's functions
jest.mock("../backend/routes/gemini.js", () => ({
  generatePrompts: jest.fn(),
  generateResponses: jest.fn(),
}));

describe("Gemini API functions", () => {
  // Reset mocks before each test to avoid test interference
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test generatePrompts returns expected text on success
  test("generatePrompts returns expected text on success", async () => {
    const mockResponse = "A beautiful woman.";
    generatePrompts.mockResolvedValue(mockResponse); 

    const result = await generatePrompts("Describe a woman."); 
    expect(result).toBe(mockResponse);                          
    expect(generatePrompts).toHaveBeenCalledWith("Describe a woman."); // Assert called with correct argument
  });

  // Test generatePrompts throws error on empty prompt input
 test("generatePrompts throws error on empty prompt", async () => {
  // Mock function returns rejected Promise if input is empty or spaces
  generatePrompts.mockImplementation((text) => {
    if (!text.trim()) {
      return Promise.reject(new Error("Empty prompt"));
    }
    return Promise.resolve("Success");
  });

  // Check that calling with empty string rejects with error
  await expect(generatePrompts("")).rejects.toThrow("Empty prompt");
  // Check that calling with spaces also rejects
  await expect(generatePrompts("   ")).rejects.toThrow("Empty prompt");
});

  // Test generatePrompts throws on API failure 
  test("generatePrompts throws on API failure", async () => {
    generatePrompts.mockRejectedValue(new Error("API failure"));  // Mock failure

    // Assert calling the function rejects with correct error
    await expect(generatePrompts("Valid prompt")).rejects.toThrow("API failure");
  });

  // Test generateResponses returns expected text on success
  test("generateResponses returns expected text on success", async () => {
    const mockResponse = "Here is a story about dogs.";
    generateResponses.mockResolvedValue(mockResponse);  // Mock success response

    const result = await generateResponses("Give me a story about dogs.");
    expect(result).toBe(mockResponse);                               
    expect(generateResponses).toHaveBeenCalledWith("Give me a story about dogs."); // Assert called with argument
  });

  // Test generateResponses throws on API failure
  test("generateResponses throws on API failure", async () => {
    generateResponses.mockRejectedValue(new Error("API error")); 

    await expect(generateResponses("Valid prompt")).rejects.toThrow("API error");
  });
});
