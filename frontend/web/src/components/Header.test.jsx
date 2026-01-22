import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Header from "./Header";

// test test
it("header finns", () => {
    render(<Header />);
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
})