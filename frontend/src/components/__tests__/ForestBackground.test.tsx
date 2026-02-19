import { render, screen } from "@testing-library/react";
import { ForestBackground } from "../ForestBackground";

describe("ForestBackground", () => {
  it("renders without crashing", () => {
    render(<ForestBackground />);
    const container = document.querySelector(".forest-background");
    expect(container).toBeInTheDocument();
  });

  it("contains gradient and sunbeam elements", () => {
    render(<ForestBackground />);
    expect(document.querySelector(".forest-gradient")).toBeInTheDocument();
    expect(document.querySelector(".sunbeam-1")).toBeInTheDocument();
    expect(document.querySelector(".sunbeam-2")).toBeInTheDocument();
  });

  it("renders leaf particles", () => {
    render(<ForestBackground />);
    const leaves = document.querySelectorAll(".leaf");
    expect(leaves.length).toBe(12);
  });

  it("has aria-hidden for accessibility", () => {
    render(<ForestBackground />);
    const container = document.querySelector("[aria-hidden]");
    expect(container).toBeInTheDocument();
  });
});
