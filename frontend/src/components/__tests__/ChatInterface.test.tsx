import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInterface } from "../ChatInterface";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("ChatInterface", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("renders header and placeholder", () => {
    render(<ChatInterface />);
    expect(screen.getByText(/Forest Whisper/i)).toBeInTheDocument();
    expect(screen.getByText(/mental coach/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
  });

  it("renders Send button", () => {
    render(<ChatInterface />);
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("disables Send when input is empty", () => {
    render(<ChatInterface />);
    expect(screen.getByRole("button", { name: /send/i })).toBeDisabled();
  });

  it("enables Send when input has text", async () => {
    render(<ChatInterface />);
    await userEvent.type(screen.getByPlaceholderText(/type your message/i), "Hello");
    expect(screen.getByRole("button", { name: /send/i })).not.toBeDisabled();
  });

  it("submits message and displays it when form is submitted", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: "I understand. How can I help?" }),
    });

    render(<ChatInterface />);
    const input = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(input, "I feel stressed");

    const form = input.closest("form");
    expect(form).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText("I feel stressed")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("I understand. How can I help?")).toBeInTheDocument();
    });
  });

  it("clears input after submit", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: "OK" }),
    });

    render(<ChatInterface />);
    const input = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(input, "Test message");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });
});
