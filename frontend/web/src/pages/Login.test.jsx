import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import Login from "./Login";

const mockLogIn = vi.fn();
vi.mock("../context", () => ({
    useAuth: () => ({
        LogIn: mockLogIn,
        isAdmin: false,
        loggedIn: false,
        loadingUser: false
    })
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("@react-oauth/google", () => ({
  GoogleLogin: () => <div data-testid="google-login" />,
  useGoogleLogin: vi.fn(),
}));


vi.stubGlobal('fetch', vi.fn());

describe("tester för login-page", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        mockNavigate.mockReset();
        mockLogIn.mockReset();
    });

    it("form skapas enligt plan", () => {
        render(<Login />);
        expect(screen.getByPlaceholderText(/E-post/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Lösenord/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Logga in/i })).toBeInTheDocument();
    });

    it("anropar backend och LogIn vid submit", async () => {
        const fakeToken = "bananer-i-pyjamas-123";

        // Mocka fetch specifikt för detta test
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: async () => ({ token: fakeToken })
            })
        ));

        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/E-post/i), { target: { value: "test@test.com" }});
        fireEvent.change(screen.getByPlaceholderText(/Lösenord/i), { target: { value: "password123" }});
        fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

        await waitFor(() => {
            expect(mockLogIn).toHaveBeenCalledWith(fakeToken);
        });
    });

    it("navigera till /profile om loggedIn är true", async () => {

        vi.mock("../context", () => ({
            useAuth: () => ({
                LogIn: mockLogIn,
                isAdmin: false,
                loggedIn: true,
                loadingUser: false
            })
        }));

        render(<Login />);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/profile");
        });
    });
});
