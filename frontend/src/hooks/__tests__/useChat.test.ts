import { renderHook, act, waitFor } from "@testing-library/react";
import { useChat } from "../useChat";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("useChat", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("starts with empty messages", () => {
    const { result } = renderHook(() => useChat(""));
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("adds user message immediately when sendMessage is called", async () => {
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            ok: true,
            json: () => Promise.resolve({ reply: "Hello back!" }),
          })
        )
    );

    const { result } = renderHook(() => useChat("/api"));

    await act(async () => {
      result.current.sendMessage("Hello");
    });

    expect(result.current.messages[0]).toEqual({
      role: "user",
      content: "Hello",
    });
  });

  it("fetches from correct URL with message", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: "Test reply" }),
    });

    const { result } = renderHook(() => useChat("https://example.com"));

    await act(async () => {
      result.current.sendMessage("Test message");
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "https://example.com/api/chat",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Test message" }),
        })
      );
    });
  });

  it("adds assistant message on successful response", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: "I am here to help!" }),
    });

    const { result } = renderHook(() => useChat(""));

    await act(async () => {
      result.current.sendMessage("Hi");
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
      expect(result.current.messages[1]).toEqual({
        role: "assistant",
        content: "I am here to help!",
      });
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("sets error and assistant message on failed response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ detail: "API Error" }),
    });

    const { result } = renderHook(() => useChat(""));

    await act(async () => {
      result.current.sendMessage("Hi");
    });

    await waitFor(() => {
      expect(result.current.error).toBe("API Error");
      expect(result.current.messages[1].content).toContain("Error");
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("ignores empty or whitespace-only messages", async () => {
    const { result } = renderHook(() => useChat(""));

    await act(async () => {
      result.current.sendMessage("");
    });

    expect(result.current.messages).toHaveLength(0);
    expect(mockFetch).not.toHaveBeenCalled();

    await act(async () => {
      result.current.sendMessage("   ");
    });

    expect(result.current.messages).toHaveLength(0);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
