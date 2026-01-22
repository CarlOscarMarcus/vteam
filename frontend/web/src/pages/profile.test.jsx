import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Profile from "./profile";

// mocka relevanta grejer
// navigate-funktion
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}));

// context
vi.mock("../context/UserContext", () => ({
    useAuth: vi.fn()
}))

import { useAuth } from "../context/UserContext";

describe("test för profilsidan", () => {

    // om användare ej är inloggad, skicka till login-sida
    it("skicka användare till /login om ej inloggad", () => {
        // mocka värden
        useAuth.mockReturnValue({
            user: null,
            loggedIn: false,
            loadingUser: false
        })
        
        render(<Profile />);
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    // visa uppgifter om användare om inloggad och användare finns
    it("visa profil om användare finns", () => {
        // mocka användaruppgifter
        useAuth.mockReturnValue({
            user: { name: "Bananer", email: "bananer@ipyjamas.se" },
            loggedIn: true,
            loadingUsr: false
        });

        render(<Profile />);
        expect(document.body.textContent).toContain("Bananer");
        expect(document.body.textContent).toContain("bananer@ipyjamas.se");

    });
});