import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StarExplosionButton } from "../StarExplosionButton";

describe("StarExplosionButton", () => {
  it("renders children text", () => {
    render(<StarExplosionButton isLoading={false}>Send</StarExplosionButton>);
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked and not disabled", async () => {
    const onClick = jest.fn();
    render(
      <StarExplosionButton onClick={onClick} disabled={false} isLoading={false}>
        Send
      </StarExplosionButton>
    );
    await userEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = jest.fn();
    render(
      <StarExplosionButton onClick={onClick} disabled isLoading={false}>
        Send
      </StarExplosionButton>
    );
    const button = screen.getByRole("button", { name: /send/i });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when isLoading", async () => {
    const onClick = jest.fn();
    render(
      <StarExplosionButton onClick={onClick} disabled={false} isLoading>
        Send
      </StarExplosionButton>
    );
    const button = screen.getByRole("button", { name: /send/i });
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("creates star particles on click", async () => {
    render(
      <StarExplosionButton onClick={() => {}} disabled={false} isLoading={false}>
        Send
      </StarExplosionButton>
    );
    await userEvent.click(screen.getByRole("button", { name: /send/i }));
    const stars = document.querySelectorAll(".star-particle");
    expect(stars.length).toBeGreaterThan(0);
  });
});
