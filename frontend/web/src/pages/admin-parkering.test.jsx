import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminParkings from "./admin-parkering";

beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
});

describe("tester för parkeringsöversikt", () => {
    it("Rubriken visas som den ska", () => {
        render(<AdminParkings />);
        expect(screen.getByRole("heading", { name: /alla parkeringar/i })).toBeInTheDocument();
    });

    it("parkeringar visas om API funkar", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    position_lat: 59.3330,
                    position_long: 18.0650,
                    status: 0,
                    scooter_id: null
                }
            ]
        });

        render(<AdminParkings />);
        expect(await screen.findByText(/parkerings-id: 1/i)).toBeInTheDocument();
    });

});
