import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CustomerList from "./admin-kunder";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
});

describe("tester för kundöversikt", () => {
    it("Rubriken visas som den ska", () => {
        render(<MemoryRouter>
            <CustomerList />
            </MemoryRouter>);
        expect(screen.getByRole("heading", { name: /kundöversikt/i })).toBeInTheDocument();
    });

    it("kunder visas om API funkar", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    email: "bananer@ipyjamas.se",
                    name: "b1",
                    status: 0,
                }
            ]
        });

        render(<MemoryRouter>
            <CustomerList />
            </MemoryRouter>);
        expect(await screen.findByText(/användar-id: 1/i)).toBeInTheDocument();
    });

});