import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Map from "./Map";

describe("tester för map-page", () => {
    // kartan renderas som den ska
    it("renderar karta", () => {
        render(<Map />);
    })

    // heading finns för kartan
    it("header till kartan finns", () => {
        render(<Map />);
        expect(screen.getByText("Hoci Scooter Map (Web)")).toBeInTheDocument();
    })


    // fler tester?


})
