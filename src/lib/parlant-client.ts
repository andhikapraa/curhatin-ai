/**
 * Parlant Client Utility
 *
 * Server-side Parlant client initialization and helper functions.
 * This client is only used on the server (API routes), never exposed to frontend.
 */

import { ParlantClient } from "parlant-client";

// Re-export the type for use in other modules
export type { ParlantClient } from "parlant-client";

/**
 * Get the Parlant server URL from environment variables
 */
function getParlantServerUrl(): string {
  const url =
    process.env.PARLANT_SERVER_URL ||
    process.env.NEXT_PUBLIC_PARLANT_SERVER_URL;

  if (!url) {
    throw new Error(
      "PARLANT_SERVER_URL or NEXT_PUBLIC_PARLANT_SERVER_URL must be set"
    );
  }

  return url;
}

/**
 * Initialize and return a Parlant client instance
 * This should only be called server-side (in API routes)
 */
export function getParlantClient(): ParlantClient {
  const serverUrl = getParlantServerUrl();

  return new ParlantClient({
    environment: serverUrl,
  });
}

/**
 * Get agent ID based on language
 * @param language - Language code ('id' for Indonesian, 'en' for English)
 * @returns Agent ID for the specified language
 */
export function getAgentId(language: "id" | "en"): string {
  if (language === "en") {
    const agentId =
      process.env.PARLANT_AGENT_ID_EN ||
      process.env.NEXT_PUBLIC_PARLANT_AGENT_ID_EN;
    if (!agentId) {
      throw new Error(
        "PARLANT_AGENT_ID_EN or NEXT_PUBLIC_PARLANT_AGENT_ID_EN must be set"
      );
    }
    return agentId;
  }
  const agentId =
    process.env.PARLANT_AGENT_ID_ID ||
    process.env.NEXT_PUBLIC_PARLANT_AGENT_ID_ID;
  if (!agentId) {
    throw new Error(
      "PARLANT_AGENT_ID_ID or NEXT_PUBLIC_PARLANT_AGENT_ID_ID must be set"
    );
  }
  return agentId;
}
