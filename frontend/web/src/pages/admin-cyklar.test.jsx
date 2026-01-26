import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminBikes from "./admin-cyklar";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => [],
    })
  ));
});

describe("tester för cykelöversikt", () => {
    it("Rubriken visas som den ska", () => {
        render(<MemoryRouter>
            <AdminBikes />
            </MemoryRouter>);
        expect(screen.getByRole("heading", { name: /cykelöversikt/i })).toBeInTheDocument();
    });

    it("kunder visas om API funkar", async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    position_lat: 59.332580,
                    position_long: 18.064900,
                    status: "ok",
                    is_available: true
                }
            ]
        });

        render(<MemoryRouter>
            <AdminBikes />
            </MemoryRouter>);
        expect(await screen.findByText(/cykel-id: 1/i)).toBeInTheDocument();
    });

});