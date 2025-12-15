// Main system prompt selector
//
// This module provides PRODUCTION system prompts optimized for concise responses.
//

import { englishSystemPrompt } from "./english";
import { indonesianSystemPrompt } from "./indonesian";

export type SupportedLanguage = "id" | "en";

/**
 * Get the appropriate system prompt based on the selected language
 * @param language - The language code ('id' for Indonesian, 'en' for English)
 * @returns The system prompt string for the specified language
 */
export function getSystemPrompt(language: SupportedLanguage): string {
  switch (language) {
    case "id":
      return indonesianSystemPrompt;
    case "en":
      return englishSystemPrompt;
    default:
      // Default to Indonesian as primary target audience
      return indonesianSystemPrompt;
  }
}

/**
 * Get the initial greeting message based on the selected language
 * @param language - The language code ('id' for Indonesian, 'en' for English)
 * @returns The greeting message for the specified language
 */
export function getGreetingMessage(language: SupportedLanguage): string {
  switch (language) {
    case "id":
      return "Halo! Aku Curhatin, teman AI kamu. Aku di sini buat dengerin dan nemenin kamu\n\nMau cerita apa aja boleh banget, aku siap dengerin tanpa nge-judge sama sekali. Gimana perasaan kamu hari ini?";
    case "en":
      return "Hello! I'm Curhatin, your AI companion. I'm here to listen and support you\n\nYou can share anything with me - I'm here to listen without any judgment. How are you feeling today?";
    default:
      return getGreetingMessage("id");
  }
}

/**
 * Get the language selection message
 * @returns The language selection prompt
 */
export function getLanguageSelectionMessage(): string {
  return "Hi! Please choose your preferred language:\n\nHalo! Silakan pilih bahasa yang kamu inginkan:";
}

/**
 * Language option labels for the chatbot interface
 */
export const LANGUAGE_OPTIONS = [
  { label: "Bahasa Indonesia", value: "id" as SupportedLanguage },
  { label: "English", value: "en" as SupportedLanguage },
] as const;

/**
 * Check if a string contains the Indonesian language selection
 * @param input - User input string
 * @returns true if Indonesian is selected
 */
export function isIndonesianSelected(input: string): boolean {
  const lowerInput = input.toLowerCase();
  return (
    lowerInput.includes("indonesia") ||
    lowerInput.includes("bahasa") ||
    lowerInput.includes("id")
  );
}

/**
 * Check if a string contains the English language selection
 * @param input - User input string
 * @returns true if English is selected
 */
export function isEnglishSelected(input: string): boolean {
  const lowerInput = input.toLowerCase();
  return lowerInput.includes("english") || lowerInput.includes("en");
}

/**
 * Parse language selection from user input
 * @param input - User input string
 * @returns The selected language or null if unclear
 */
export function parseLanguageSelection(
  input: string
): SupportedLanguage | null {
  if (isIndonesianSelected(input)) {
    return "id";
  }
  if (isEnglishSelected(input)) {
    return "en";
  }
  return null;
}
