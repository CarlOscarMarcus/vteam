import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import History from "./history";

// mocka
vi.mock("../context/UserContext", () => ({
    useAuth: vi.fn()
}));

const { useAuth } = await import("../context/UserContext");

describe("tester för history-page", () => {
    // ingen historik finns
    it("visa 'ingen historik' när historik inte finns", async () => {
        useAuth.mockReturnValue({ token: "bananer-i-pyjamas-123" });
        // mocka fetch, svara med tom array [] = ingen historik
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([])
            })
        );

        render(<History />);

        await waitFor(() => {
            expect(screen.getByText("Ingen historik!")).toBeInTheDocument();
        })
    })

    it("visar historik om det finns", async () => {
        useAuth.mockReturnValue({ token: "bananer-i-pyjamas-123" });

        // mocka fetch med fake-historik
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                Promise.resolve([
                    {
                    id: 1,
                    date: "2024-01-01T10:00:00Z",
                    start_location: "A",
                    end_location: "B",
                    },
            ]),
        })
    )
    render(<History />);
    await waitFor(() => {
        expect(screen.getByText("Resa #1")).toBeInTheDocument();
        expect(screen.getByText("Start: A")).toBeInTheDocument();
        expect(screen.getByText("Slut: B")).toBeInTheDocument();
    })
    })
})