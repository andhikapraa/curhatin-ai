"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import ChatBot, { Button } from "react-chatbotify";
import {
  getGreetingMessage,
  getLanguageSelectionMessage,
  parseLanguageSelection,
  type SupportedLanguage,
} from "./system-prompts";

const CurhatinChatBot: React.FC = () => {
  // Language selection state
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage | null>(null);

  // Parlant session management state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lastEventOffset, setLastEventOffset] = useState<number>(0);
  const [sessionError, setSessionError] = useState<boolean>(false);
  const [sessionReady, setSessionReady] = useState<boolean>(false);

  // Turnstile state for bot verification
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Ref to track in-flight session creation to prevent race conditions
  const sessionCreationPromiseRef = useRef<Promise<string | null> | null>(null);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      // Try multiple selectors to find the chat button
      const selectors = [
        '[data-testid="chat-button"]',
        ".rcb-chat-button",
        '[aria-label*="chat"]',
        'button[style*="position: fixed"]',
      ];

      for (const selector of selectors) {
        const chatButton = document.querySelector(selector) as HTMLElement;
        if (chatButton) {
          chatButton.click();
          break;
        }
      }
    };

    window.addEventListener("openCurhatinChatbot", handleOpenChatbot);

    return () => {
      window.removeEventListener("openCurhatinChatbot", handleOpenChatbot);
    };
  }, []);

  // Visual Viewport API for mobile keyboard handling
  useEffect(() => {
    // Check if Visual Viewport API is supported
    if (
      typeof window !== "undefined" &&
      "visualViewport" in window &&
      window.visualViewport
    ) {
      const handleViewportChange = () => {
        const viewport = window.visualViewport;
        const chatWindow = document.querySelector(
          ".rcb-chat-window"
        ) as HTMLElement;
        const chatBody = document.querySelector(
          ".rcb-chat-body"
        ) as HTMLElement;
        const chatInputRow = document.querySelector(
          ".rcb-chat-input-row"
        ) as HTMLElement;

        if (chatWindow && viewport) {
          const keyboardHeight = window.innerHeight - viewport.height;
          const isKeyboardOpen = keyboardHeight > 50; // Threshold to detect keyboard

          // Set data attribute for CSS targeting
          chatWindow.setAttribute(
            "data-keyboard-open",
            isKeyboardOpen.toString()
          );

          if (isKeyboardOpen) {
            // Keyboard is open - position input directly above keyboard
            const viewportHeight = viewport.height;
            const viewportTop = viewport.offsetTop || 0;

            chatWindow.style.setProperty(
              "--keyboard-height",
              `${keyboardHeight}px`
            );
            chatWindow.style.setProperty(
              "height",
              `${viewportHeight}px`,
              "important"
            );
            chatWindow.style.setProperty(
              "top",
              `${viewportTop}px`,
              "important"
            );

            // Position input row directly above the keyboard with minimal gap
            if (chatInputRow) {
              chatInputRow.style.setProperty("position", "fixed", "important");
              chatInputRow.style.setProperty(
                "bottom",
                `${keyboardHeight - 5}px`,
                "important"
              ); // 5px gap from keyboard
              chatInputRow.style.setProperty("left", "0px", "important");
              chatInputRow.style.setProperty("right", "0px", "important");
              chatInputRow.style.setProperty("z-index", "1001", "important");
              chatInputRow.style.setProperty(
                "background-color",
                "white",
                "important"
              );
              chatInputRow.style.setProperty(
                "padding",
                "8px 12px",
                "important"
              );
              chatInputRow.style.setProperty(
                "box-shadow",
                "0 -2px 8px rgba(0,0,0,0.1)",
                "important"
              );
            }

            // Adjust chat body to account for repositioned input
            if (chatBody) {
              const inputRowHeight = 50; // Approximate height with padding
              chatBody.style.setProperty(
                "padding-bottom",
                `${inputRowHeight + 10}px`,
                "important"
              );
              chatBody.style.setProperty(
                "max-height",
                `${viewportHeight - 60 - inputRowHeight}px`,
                "important"
              ); // 60px for header
              chatBody.style.setProperty("overflow-y", "auto", "important");

              // Scroll to bottom to keep latest messages visible
              setTimeout(() => {
                if (chatBody.scrollHeight > chatBody.clientHeight) {
                  chatBody.scrollTop = chatBody.scrollHeight;
                }
              }, 150);
            }
          } else {
            // Keyboard is closed - complete reset to default state
            chatWindow.style.removeProperty("--keyboard-height");
            chatWindow.style.removeProperty("height");
            chatWindow.style.removeProperty("bottom");
            chatWindow.style.removeProperty("top");

            if (chatInputRow) {
              // Remove all positioning properties
              chatInputRow.style.removeProperty("position");
              chatInputRow.style.removeProperty("bottom");
              chatInputRow.style.removeProperty("left");
              chatInputRow.style.removeProperty("right");
              chatInputRow.style.removeProperty("z-index");

              // Remove styling properties
              chatInputRow.style.removeProperty("background-color");
              chatInputRow.style.removeProperty("border-top");
              chatInputRow.style.removeProperty("padding");
              chatInputRow.style.removeProperty("box-shadow");
            }

            if (chatBody) {
              chatBody.style.removeProperty("padding-bottom");
              chatBody.style.removeProperty("max-height");
              chatBody.style.removeProperty("overflow-y");
            }
          }
        }
      };

      // Add event listeners
      window.visualViewport.addEventListener("resize", handleViewportChange);
      window.visualViewport.addEventListener("scroll", handleViewportChange);

      // Initial call to set up the layout
      handleViewportChange();

      return () => {
        if (window.visualViewport) {
          window.visualViewport.removeEventListener(
            "resize",
            handleViewportChange
          );
          window.visualViewport.removeEventListener(
            "scroll",
            handleViewportChange
          );
        }
      };
    }
    // Fallback for browsers without Visual Viewport API
    const handleFallbackKeyboardDetection = () => {
      const chatWindow = document.querySelector(
        ".rcb-chat-window"
      ) as HTMLElement;
      const chatInput = document.querySelector(
        ".rcb-chat-input"
      ) as HTMLElement;

      if (chatWindow && chatInput) {
        const initialHeight = window.innerHeight;

        const handleResize = () => {
          const currentHeight = window.innerHeight;
          const heightDifference = initialHeight - currentHeight;
          const isKeyboardOpen = heightDifference > 150; // Threshold for keyboard detection

          chatWindow.setAttribute(
            "data-keyboard-open",
            isKeyboardOpen.toString()
          );

          if (isKeyboardOpen) {
            chatWindow.style.setProperty(
              "--keyboard-height",
              `${heightDifference}px`
            );
          } else {
            chatWindow.style.removeProperty("--keyboard-height");
          }
        };

        const handleInputFocus = () => {
          // Small delay to allow keyboard to appear
          setTimeout(() => {
            const chatBody = document.querySelector(
              ".rcb-chat-body"
            ) as HTMLElement;
            if (chatBody) {
              chatBody.scrollTop = chatBody.scrollHeight;
            }
          }, 300);
        };

        window.addEventListener("resize", handleResize);
        chatInput.addEventListener("focus", handleInputFocus);

        return () => {
          window.removeEventListener("resize", handleResize);
          chatInput.removeEventListener("focus", handleInputFocus);
        };
      }
    };

    // Set up fallback detection with a delay to ensure DOM is ready
    const timeoutId = setTimeout(handleFallbackKeyboardDetection, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Prevent body scroll on mobile when chat is open with enhanced error handling
  useEffect(() => {
    if (typeof window !== "undefined") {
      let scrollPosition = 0;
      let observer: MutationObserver | null = null;

      // Defensive scroll restoration function
      const restoreScroll = () => {
        try {
          if (document.body.classList.contains("chat-open")) {
            document.body.classList.remove("chat-open");
            document.body.style.removeProperty("top");
            // Use requestAnimationFrame for smoother scroll restoration
            requestAnimationFrame(() => {
              window.scrollTo(0, scrollPosition);
            });
          }
        } catch (error) {
          console.warn("Error restoring scroll position:", error);
        }
      };

      // Enhanced visibility detection with fallbacks
      const isElementVisible = (element: HTMLElement): boolean => {
        try {
          if (!element?.offsetParent) {
            return false;
          }

          const computedStyle = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();

          return (
            computedStyle.display !== "none" &&
            computedStyle.visibility !== "hidden" &&
            element.style.display !== "none" &&
            rect.width > 0 &&
            rect.height > 0
          );
        } catch (error) {
          console.warn("Error checking element visibility:", error);
          return false;
        }
      };

      const handleChatToggle = () => {
        try {
          const chatWindow = document.querySelector(
            ".rcb-chat-window"
          ) as HTMLElement;
          const isMobile = window.innerWidth <= 768;

          if (chatWindow && isMobile) {
            observer = new MutationObserver((mutations) => {
              for (const mutation of mutations) {
                if (
                  mutation.type === "attributes" &&
                  (mutation.attributeName === "style" ||
                    mutation.attributeName === "class")
                ) {
                  const isVisible = isElementVisible(chatWindow);
                  const bodyHasChatClass =
                    document.body.classList.contains("chat-open");

                  if (isVisible && !bodyHasChatClass) {
                    // Chat is opening - save scroll position and prevent body scroll
                    scrollPosition =
                      window.pageYOffset ||
                      document.documentElement.scrollTop ||
                      0;
                    document.body.classList.add("chat-open");
                    document.body.style.top = `-${scrollPosition}px`;
                  } else if (!isVisible && bodyHasChatClass) {
                    // Chat is closing - restore body scroll and position
                    restoreScroll();
                  }
                }
              }
            });

            observer.observe(chatWindow, {
              attributes: true,
              attributeFilter: ["style", "class"],
              childList: true,
              subtree: false,
            });

            return () => {
              if (observer) {
                observer.disconnect();
                observer = null;
              }
              // Cleanup on unmount - ensure scroll is restored
              restoreScroll();
            };
          }
        } catch (error) {
          console.warn("Error setting up chat toggle handler:", error);
        }
      };

      // Set up with a delay to ensure DOM is ready
      const timeoutId = setTimeout(handleChatToggle, 1000);

      // Emergency cleanup on page unload
      const handleBeforeUnload = () => {
        restoreScroll();
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("beforeunload", handleBeforeUnload);
        if (observer) {
          observer.disconnect();
        }
        restoreScroll();
      };
    }
  }, []);

  /**
   * Create a Parlant session with the appropriate agent based on language
   * Uses a ref to track in-flight creation to prevent race conditions from concurrent calls
   * @param language - Optional language override. If not provided, uses selectedLanguage from state
   */
  const createParlantSession = (
    language?: SupportedLanguage
  ): Promise<string | null> => {
    // Use provided language or fall back to state
    const langToUse = language || selectedLanguage;

    if (!langToUse) {
      console.error("Cannot create session: language not selected");
      return Promise.resolve(null);
    }

    if (!turnstileToken) {
      console.error("Cannot create session: Turnstile token not available");
      return Promise.resolve(null);
    }

    if (sessionId) {
      // Session already exists
      return Promise.resolve(sessionId);
    }

    // Check if there's already a session creation in progress
    if (sessionCreationPromiseRef.current) {
      // Return the existing promise to prevent duplicate session creation
      return sessionCreationPromiseRef.current;
    }

    // Create new session creation promise
    const creationPromise = (async (): Promise<string | null> => {
      try {
        const response = await fetch("/api/v1/parlant/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: langToUse,
            turnstileToken,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to create session: ${response.statusText}`);
        }

        const data = (await response.json()) as { sessionId: string };
        const newSessionId = data.sessionId;

        // Set state only once from the resolved result
        setSessionId(newSessionId);
        setLastEventOffset(0);

        // Clear the ref on success
        sessionCreationPromiseRef.current = null;

        return newSessionId;
      } catch (error) {
        console.error("Error creating Parlant session:", error);

        // Clear the ref on failure before returning
        sessionCreationPromiseRef.current = null;

        return null;
      }
    })();

    // Store the promise in the ref
    sessionCreationPromiseRef.current = creationPromise;

    return creationPromise;
  };

  /**
   * Send a message to Parlant session
   */
  const sendParlantMessage = async (
    currentSessionId: string,
    message: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `/api/v1/parlant/sessions/${currentSessionId}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error("Error sending message to Parlant:", error);
      return false;
    }
  };

  /**
   * Poll for new events from Parlant session
   * Injects AI messages as they arrive using params.injectMessage
   * @param params - React ChatBotify params for injecting messages
   */
  const pollForParlantResponse = async (
    currentSessionId: string,
    params: {
      injectMessage: (content: string, sender?: string) => Promise<void>;
    },
    timeout = 60_000
  ): Promise<string | null> => {
    const startTime = Date.now();
    const maxAttempts = 20; // Poll up to 20 times
    let attempt = 0;
    let currentOffset = lastEventOffset; // Track offset locally
    const foundMessages: string[] = []; // Collect ALL AI messages
    let consecutiveReadyCount = 0; // Track consecutive "ready" statuses

    while (Date.now() - startTime < timeout && attempt < maxAttempts) {
      try {
        // CRITICAL: Don't pass 'kinds' parameter - it causes the SDK to filter out message events!
        const response = await fetch(
          `/api/v1/parlant/sessions/${currentSessionId}/events?minOffset=${currentOffset}&waitForData=2`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          // No content yet, continue polling
          attempt += 1;
          continue;
        }

        if (!response.ok) {
          if (response.status === 504) {
            // Timeout is expected for long polling, continue polling
            attempt += 1;
            continue;
          }
          throw new Error(`Failed to poll events: ${response.statusText}`);
        }

        const data = (await response.json()) as {
          timeout?: boolean;
          events?: Array<{
            offset: number;
            kind: string;
            source?: string;
            message?: string;
            status?: string;
          }>;
        };
        if (data?.timeout) {
          // Backend signaled an expected timeout; continue polling
          attempt += 1;
          await new Promise((resolve) => setTimeout(resolve, 300));
          continue;
        }
        const events = data.events || [];
        console.log(
          `[CHATBOT-DEBUG] Got ${events.length} events, currentOffset=${currentOffset}`,
          events
        );

        // Process ALL events in the batch (following official Parlant pattern)
        let readyCountInBatch = 0; // Count how many "ready" events in this batch
        let sawNonReadyStatusInThisBatch = false;

        for (const event of events) {
          console.log("[CHATBOT-DEBUG] Processing event:", {
            offset: event.offset,
            kind: event.kind,
            source: event.source,
            hasMessage: !!event.message,
            status: event.status,
            message: event.message,
          });

          // Update offset for EVERY event (using Math.max pattern from official docs)
          currentOffset = Math.max(currentOffset, event.offset + 1);

          // Inject AI messages immediately as they arrive (Parlant can send multiple messages per interaction)
          if (
            event.kind === "message" &&
            event.source === "ai_agent" &&
            event.message
          ) {
            // Filter out very short messages (e.g., ":", ".", etc.)
            const trimmedMessage = event.message.trim();
            if (trimmedMessage.length >= 3) {
              console.log(
                `[CHATBOT-DEBUG] Found AI message at offset ${event.offset}:`,
                event.message
              );
              // Inject message immediately so it appears in its own bubble
              await params.injectMessage(event.message, "bot");
              foundMessages.push(event.message);
            } else {
              console.log(
                `[CHATBOT-DEBUG] Skipping short message (${trimmedMessage.length} chars) at offset ${event.offset}:`,
                event.message
              );
            }
            // Reset ready counter when we get a new message (even if it's too short to display)
            consecutiveReadyCount = 0;
          }

          // Track status events
          if (event.kind === "status" && event.source === "ai_agent") {
            if (event.status === "ready") {
              console.log(
                `[CHATBOT-DEBUG] AI status: ready at offset ${event.offset}`
              );
              readyCountInBatch += 1; // Count each "ready" event
            } else if (
              event.status === "processing" ||
              event.status === "typing"
            ) {
              console.log(
                `[CHATBOT-DEBUG] AI status: ${event.status} at offset ${event.offset}`
              );
              sawNonReadyStatusInThisBatch = true;
              // Reset ready counter if AI is still working
              consecutiveReadyCount = 0;
            }
          }
        }

        // Update consecutive ready counter - add the COUNT of ready events, not just 1
        if (readyCountInBatch > 0 && !sawNonReadyStatusInThisBatch) {
          consecutiveReadyCount += readyCountInBatch;
          console.log(
            `[CHATBOT-DEBUG] Consecutive ready count: ${consecutiveReadyCount} (added ${readyCountInBatch} from this batch)`
          );
        }

        // Update state with the highest offset processed
        setLastEventOffset(currentOffset);
        console.log(
          `[CHATBOT-DEBUG] Updated lastEventOffset to ${currentOffset}`
        );

        // If we have messages AND seen 2 consecutive "ready" statuses, we're done
        if (foundMessages.length > 0 && consecutiveReadyCount >= 2) {
          console.log(
            `[CHATBOT-DEBUG] AI finished! Injected ${foundMessages.length} messages (2 consecutive ready)`
          );
          // Return null since we've already injected all messages
          return null;
        }

        // If we got events but no complete response yet, continue polling
        if (events.length > 0) {
          console.log(
            `[CHATBOT-DEBUG] Messages: ${foundMessages.length}, Ready count: ${consecutiveReadyCount}, continuing to poll...`
          );
          attempt += 1;
          continue;
        }

        // No events yet, wait a bit before next poll
        await new Promise((resolve) => setTimeout(resolve, 500));
        attempt += 1;
      } catch (error) {
        console.error("Error polling Parlant events:", error);
        // Retry on error
        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempt += 1;
      }
    }

    // Timeout - messages were already injected, just return null
    if (foundMessages.length > 0) {
      console.log(
        `[CHATBOT-DEBUG] Polling timed out, but already injected ${foundMessages.length} messages`
      );
      return null;
    }

    console.log("[CHATBOT-DEBUG] Polling timed out, no AI messages found");
    return null;
  };

  /**
   * Main function to send message and get response from Parlant
   * @param params - React ChatBotify params for injecting messages
   */
  const callParlant = async (
    userMessage: string,
    params: {
      injectMessage: (content: string, sender?: string) => Promise<void>;
    }
  ): Promise<string | null> => {
    try {
      // Ensure session exists
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = await createParlantSession();
        if (!currentSessionId) {
          throw new Error("Failed to create session");
        }
      }

      // Send message
      const messageSent = await sendParlantMessage(
        currentSessionId,
        userMessage
      );
      if (!messageSent) {
        throw new Error("Failed to send message");
      }

      // Poll for response (messages will be injected as they arrive)
      await pollForParlantResponse(currentSessionId, params);

      // Return null since messages were already injected
      return null;
    } catch (error) {
      console.error("Error calling Parlant:", error);
      // Return error message for display
      return selectedLanguage === "en"
        ? "I'm having trouble connecting right now. Please try again in a moment."
        : "Aku lagi ada masalah koneksi nih. Coba lagi ya sebentar lagi.";
    }
  };

  // Chatbot flow configuration
  const flow = {
    start: {
      message: getLanguageSelectionMessage(),
      options: ["Bahasa Indonesia", "English"],
      path: (params: { userInput: string }) => {
        const selectedLang = parseLanguageSelection(params.userInput);
        if (selectedLang) {
          setSelectedLanguage(selectedLang);
          return selectedLang === "en"
            ? "greeting_english"
            : "greeting_indonesian";
        }
        // Instead of returning to a different block, handle invalid input directly
        return "invalid_selection";
      },
    },
    invalid_selection: {
      message:
        "I didn't understand your selection. Please click on one of the language options above: Bahasa Indonesia or English",
      path: (params: { userInput: string }) => {
        const selectedLang = parseLanguageSelection(params.userInput);
        if (selectedLang) {
          setSelectedLanguage(selectedLang);
          return selectedLang === "en"
            ? "greeting_english"
            : "greeting_indonesian";
        }
        return "invalid_selection"; // Loop here safely without options
      },
    },
    greeting_english: {
      message: async () => {
        try {
          // Wait for Turnstile token if not available yet
          if (!turnstileToken) {
            console.log("Waiting for Turnstile token...");
            // Give it a moment for Turnstile to complete
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (!turnstileToken) {
              setSessionError(true);
              setSessionReady(false);
              return "I'm sorry, but I need to verify you're not a robot first. Please wait a moment and try again.";
            }
          }

          // Create Parlant session when greeting is shown
          // Pass language explicitly to avoid state timing issues
          const newSessionId = await createParlantSession("en");

          // Check if session creation failed
          if (!newSessionId) {
            console.error("Failed to create Parlant session for greeting");
            setSessionError(true);
            setSessionReady(false);

            // Return a fallback greeting that informs the user and prevents sending
            return "I'm sorry, but I'm having trouble setting up our chat session right now. Please try refreshing the page or try again in a moment. If the problem persists, please contact support.";
          }

          // Session created successfully
          setSessionError(false);
          setSessionReady(true);
          return getGreetingMessage("en");
        } catch (error) {
          console.error("Error in greeting_english message:", error);
          setSessionError(true);
          setSessionReady(false);

          // Return a fallback greeting that prevents sending
          return "I'm sorry, but I'm having trouble setting up our chat session right now. Please try refreshing the page or try again in a moment. If the problem persists, please contact support.";
        }
      },
      path: "llm_conversation",
    },
    greeting_indonesian: {
      message: async () => {
        try {
          // Wait for Turnstile token if not available yet
          if (!turnstileToken) {
            console.log("Waiting for Turnstile token...");
            // Give it a moment for Turnstile to complete
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (!turnstileToken) {
              setSessionError(true);
              setSessionReady(false);
              return "Maaf, aku perlu verifikasi dulu kalau kamu bukan robot. Tolong tunggu sebentar dan coba lagi ya.";
            }
          }

          // Create Parlant session when greeting is shown
          // Pass language explicitly to avoid state timing issues
          const newSessionId = await createParlantSession("id");

          // Check if session creation failed
          if (!newSessionId) {
            console.error("Failed to create Parlant session for greeting");
            setSessionError(true);
            setSessionReady(false);

            // Return a fallback greeting that informs the user and prevents sending
            return "Maaf, aku lagi ada masalah untuk menyiapkan sesi chat kita sekarang. Tolong refresh halaman atau coba lagi sebentar lagi ya. Kalau masalahnya masih ada, tolong hubungi support.";
          }

          // Session created successfully
          setSessionError(false);
          setSessionReady(true);
          return getGreetingMessage("id");
        } catch (error) {
          console.error("Error in greeting_indonesian message:", error);
          setSessionError(true);
          setSessionReady(false);

          // Return a fallback greeting that prevents sending
          return "Maaf, aku lagi ada masalah untuk menyiapkan sesi chat kita sekarang. Tolong refresh halaman atau coba lagi sebentar lagi ya. Kalau masalahnya masih ada, tolong hubungi support.";
        }
      },
      path: "llm_conversation",
    },
    llm_conversation: {
      message: async (
        // Cast params to any to work around library type mismatch
        // The library's injectMessage returns Promise<Message | null> but Flow expects Promise<void>
        // biome-ignore lint/suspicious/noExplicitAny: Required for library compatibility
        params: any
      ) => {
        // Wrap injectMessage to ensure it returns void for type compatibility
        const wrappedInjectMessage = async (
          content: string,
          sender?: string
        ): Promise<void> => {
          await params.injectMessage(content, sender);
        };
        // Prevent sending messages if there's a session error
        if (sessionError) {
          const errorMessage =
            selectedLanguage === "en"
              ? "I'm sorry, but I'm unable to process messages right now due to a session error. Please refresh the page to try again."
              : "Maaf, aku tidak bisa memproses pesan sekarang karena ada masalah sesi. Tolong refresh halaman untuk coba lagi.";
          return errorMessage;
        }

        // Prevent sending messages if session is not ready
        if (!(sessionReady && sessionId)) {
          const notReadyMessage =
            selectedLanguage === "en"
              ? "Please wait while I set up the chat session. If this message persists, please refresh the page."
              : "Tolong tunggu sebentar sementara aku menyiapkan sesi chat. Kalau pesan ini terus muncul, tolong refresh halaman.";
          return notReadyMessage;
        }

        if (params.userInput) {
          // Pass wrapped injectMessage to callParlant so it can inject messages as they arrive
          const result = await callParlant(params.userInput, {
            injectMessage: wrappedInjectMessage,
          });
          // Convert null to void for type compatibility
          return result ?? undefined;
        }
        const fallbackMessage =
          selectedLanguage === "en"
            ? "I'm here to listen. What's on your mind?"
            : "Aku di sini buat dengerin kamu. Ada apa yang lagi kamu pikirin?";
        return fallbackMessage;
      },
      path: "llm_conversation",
    },
  };

  // Curhatin-themed settings
  const settings = {
    general: {
      primaryColor: "#5DC998",
      secondaryColor: "#D9F1F3",
      fontFamily:
        "var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    chatHistory: {
      disabled: true, // Explicitly disable chat history to prevent duplicate options
      maxEntries: 0, // Don't store any chat history
    },
    chatButton: {
      icon: "/robot-mascot.png",
    },
    header: {
      title: "Curhatin AI",
      showAvatar: true,
      avatar: "/logo.png",
      buttons: [Button.CLOSE_CHAT_BUTTON],
    },
    chatWindow: {
      showScrollbar: false,
      autoJumpToBottom: true,
      showMessagePrompt: false, // Reduce UI clutter on mobile
      messagePromptText: "Cerita yuk",
      messagePromptOffset: 30,
    },
    userBubble: {
      animate: true,
      showAvatar: false,
    },
    botBubble: {
      animate: true,
      showAvatar: true,
      avatar: "/robot-mascot.png",
    },
    footer: {
      text: "Powered by Curhatin AI - Teman curhatmu, kapan saja",
    },
    tooltip: {
      mode: "CLOSE",
      text: "Cerita yuk",
    },
    device: {
      desktopEnabled: true,
      mobileEnabled: true,
      applyMobileOptimizations: true,
    },
    chatInput: {
      disabled: false,
      allowNewline: false, // Prevent multi-line on mobile for better keyboard handling
      enabledPlaceholderText: "Ketik pesanmu...",
      disabledPlaceholderText: "",
      showCharacterCount: false,
      characterLimit: -1,
      botDelay: 1000,
      blockSpam: true,
      sendOptionOutput: true,
      sendCheckboxOutput: true,
    },
  };

  // Custom styles to match Curhatin brand
  const styles = {
    chatButtonStyle: {
      backgroundColor: "#5DC998",
      width: "60px",
      height: "60px",
      fontSize: "24px",
      borderRadius: "50%",
      border: "none",
      boxShadow: "0 4px 12px rgba(93, 201, 152, 0.3)",
    },
    headerStyle: {
      background: "#ffffff",
      color: "#1f2937",
      fontWeight: "600",
      borderBottom: "1px solid #e2e8f0",
    },
    avatarStyle: {
      display: "block",
      visibility: "visible",
      opacity: "1",
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    headerCloseButtonStyle: {
      color: "#1f2937",
      fontSize: "20px",
      fontWeight: "bold",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "4px",
      borderRadius: "4px",
      transition: "background-color 0.2s ease",
    },
    closeChatIconStyle: {
      fill: "#1f2937",
      stroke: "#1f2937",
    },
    chatWindowStyle: {
      backgroundColor: "#ffffff",
      fontFamily: "var(--font-poppins), sans-serif",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      border: "1px solid #e2e8f0",
      maxWidth: "min(350px, calc(100vw - 40px))",
      maxHeight: "min(500px, calc(100vh - 140px))",
    },
    userBubbleStyle: {
      backgroundColor: "#5DC998",
      color: "#ffffff",
    },
    botBubbleStyle: {
      backgroundColor: "#f8fafc",
      color: "#1f2937",
      border: "1px solid #e2e8f0",
    },
    footerStyle: {
      backgroundColor: "#f8fafc",
      color: "#64748b",
      fontSize: "12px",
      textAlign: "center" as const,
    },
    headerAvatarStyle: {
      width: "40px",
      height: "40px",
      objectFit: "contain" as const,
      borderRadius: "8px",
    },
    tooltipStyle: {
      backgroundColor: "#5DC998",
      color: "white",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 2px 8px rgba(93, 201, 152, 0.3)",
      border: "none",
      // Fix tooltip positioning - place to the left of chat button
      position: "fixed" as const,
      bottom: "30px",
      right: "90px",
    },
  };

  return (
    <>
      {/* Hidden Turnstile widget for bot verification */}
      <div style={{ position: "fixed", bottom: "-100px", left: "-100px" }}>
        <Turnstile
          onError={() => {
            console.error("Turnstile verification failed");
            setTurnstileToken(null);
          }}
          onExpire={() => {
            console.log("Turnstile token expired, refreshing...");
            setTurnstileToken(null);
          }}
          onSuccess={(token) => {
            console.log("Turnstile verification successful");
            setTurnstileToken(token);
          }}
          options={{
            theme: "light",
            size: "invisible",
          }}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
        />
      </div>
      <ChatBot flow={flow} settings={settings} styles={styles} />
    </>
  );
};

export default CurhatinChatBot;
