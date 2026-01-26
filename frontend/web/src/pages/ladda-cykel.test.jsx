import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, global } from "vitest";
import ParkScooter from "./ladda-cykel";
import { MemoryRouter } from "react-router-dom";

// mocka hooks
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
        useNavigate: () => vi.fn()
    };
});

// tester för att ladda cykel
describe("ladda cykel", () => {
    it("visa starta laddning när status är ok", async () => {

    // mocka fetch
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve([
                    {
                        id: 1,
                        battery: 78,
                        position_lat: 59.332580,
                        position_long: 18.064900,
                        status: "ok",
                        user_id: null
                    }
                ])
        })
    );

        render(
            <MemoryRouter>
                <ParkScooter />
            </MemoryRouter>
        )
    const button = await screen.findByRole("button", {
        name: /starta laddning/i
    })

    expect(button).toBeInTheDocument();
    })

});