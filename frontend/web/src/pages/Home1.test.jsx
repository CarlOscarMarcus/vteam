import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import Home from "./Home1";

it("Huvudrubriken funkar", () => {
    render(<Home/>)

    expect(screen.getByRole("heading", {name:/hyr din elsparkcykel hos oss!/i})).toBeInTheDocument();
});