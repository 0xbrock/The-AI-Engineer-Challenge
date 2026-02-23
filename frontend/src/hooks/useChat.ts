"use client";

import { useState, useCallback } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * useChat - Manages chat state and API communication with /api/chat.
 * Returns messages, loading state, and a send function.
 */
export function useChat(apiBaseUrl: string = "") {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: ChatMessage = { role: "user", content: content.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      setError(null);

      const base = apiBaseUrl || (typeof window !== "undefined" ? "" : "http://localhost:8000");
      const url = `${base}/api/chat`.replace(/([^:]\/)\/+/g, "$1");

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.detail || `HTTP ${res.status}`);
        }

        const data = (await res.json()) as { reply: string };
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.reply,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to get response";
        setError(msg);
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${msg}` }]);
      } finally {
        setIsLoading(false);
      }
    },
    [apiBaseUrl, isLoading, messages]
  );

  return { messages, isLoading, error, sendMessage };
}
