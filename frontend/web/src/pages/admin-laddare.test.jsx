import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminChargers from "./admin-laddare";

beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
});

describe("tester för laddningssöversikt", () => {
    it("Rubriken visas som den ska", () => {
        render(<AdminChargers />);
        expect(screen.getByRole("heading", { name: /alla laddstationer/i })).toBeInTheDocument();
    });

    it("laddare visas om API funkar", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    position_lat: 59.3328,
                    position_long: 18.0660,
                    status: 0,
                }
            ]
        });

        render(<AdminChargers />);
        expect(await screen.findByText(/ladd-id: 1/i)).toBeInTheDocument();
    });

});
