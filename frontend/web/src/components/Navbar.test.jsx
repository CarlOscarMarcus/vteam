import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

// mocka usercontext
vi.mock("../context/UserContext", () => ({
    useAuth: vi.fn()
}));
const { useAuth } = await import("../context/UserContext");

describe("tester för navbar", () => {

    it("visar logga ut när inloggad", () => {
        useAuth.mockReturnValue({
            loggedIn: true,
            loadingUser: false
        })

        render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
        )
        expect(screen.getByText("Logga ut")).toBeInTheDocument();
    });

    it("visar admin-meny när admin är inloggad", () => {
        useAuth.mockReturnValue({
            loggedIn: true,
            loadingUser: false,
            isAdmin: true
        });

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(screen.getByText("Kundöversikt")).toBeInTheDocument();
        expect(screen.getByText("Cykelöversikt")).toBeInTheDocument();
        expect(screen.getByText("Parkeringsöversikt")).toBeInTheDocument();

    })
});