import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Signup from "./signup"
import { MemoryRouter } from "react-router-dom";

// mocka usercontext
vi.mock("../context", () => ({
    useAuth: () => ({
        SignUp: vi.fn()
    })
}))

describe("tester för signup-page", () => {
    it("renderar komplett formulär", () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        )

        expect(screen.getByPlaceholderText(/namn/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/e-post/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/lösenord/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {
            name: /skapa konto/i
        })).toBeInTheDocument();

    })
})