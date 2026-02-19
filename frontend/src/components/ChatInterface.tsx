"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { StarExplosionButton } from "./StarExplosionButton";
import { ForestBackground } from "./ForestBackground";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * ChatInterface - Main chat UI with forest theme, integrating
 * the /api/chat backend. Features a star-explosion submit button
 * and scroll-to-bottom on new messages.
 */
export function ChatInterface() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, error, sendMessage } = useChat(API_BASE);

  useEffect(() => {
    const el = scrollRef.current;
    if (el?.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <ForestBackground />

      <main className="relative z-10 flex flex-col flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:px-6">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-100/95 tracking-tight">
            Forest Whisper
          </h1>
          <p className="text-amber-200/60 mt-2 text-sm">
            Your supportive mental coach, grounded in nature
          </p>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto pb-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-amber-200/50 text-sm">
              Share what&apos;s on your mind. The forest is listening.
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[85%] rounded-2xl px-4 py-3 shadow-lg
                  ${
                    msg.role === "user"
                      ? "bg-amber-600/40 text-amber-50"
                      : "bg-emerald-900/30 text-amber-100/90 border border-emerald-700/30"
                  }
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {error && (
            <div className="text-center text-amber-400/80 text-sm">
              {error}
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="
              flex-1 rounded-xl px-4 py-3
              bg-emerald-950/50 text-amber-50 placeholder-amber-400/50
              border border-emerald-800/50 focus:border-amber-500/50
              focus:ring-2 focus:ring-amber-500/20 focus:outline-none
              transition-colors disabled:opacity-60
            "
          />
          <StarExplosionButton
            disabled={!input.trim()}
            isLoading={isLoading}
          >
            {isLoading ? "..." : "Send"}
          </StarExplosionButton>
        </form>
      </main>
    </div>
  );
}
