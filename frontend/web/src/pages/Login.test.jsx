import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import Login from "./Login";


// mocka
const mockLogIn = vi.fn();
vi.mock("../context/UserContext", () => ({
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

global.fetch = vi.fn();

describe("tester för login-page", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        mockNavigate.mockReset();
        mockLogIn.mockReset();
    })

    // kolla att form funkar, alla inputs + loginknappt ska finnas
    it("form skapas enligt plan", () => {
        render(<Login />);
        expect(screen.getByPlaceholderText(/E-post/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Lösenord/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Logga in/i })).toBeInTheDocument();
    })

    // login och backend länkade med submit
    it("anropar backend och LogIn vid submit", async () => {
        const fakeToken = "bananer-i-pyjamas-123";
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ token: fakeToken }),
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/E-post/i), { target: { value: "test@test.com" }});
    fireEvent.change(screen.getByPlaceholderText(/Lösenord/i), { target: { value: "password123" }});
    fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

    await waitFor(() => {
        expect(mockLogIn).toHaveBeenCalledWith(fakeToken);
        });
    });

    // kolla att man skickas till /profile om inloggad
    it("navigera till /profile om loggedIn är true", async () => {
        vi.mock("../context/UserContext", ()=> ({
            useAuth: () => ({
                LogIn: mockLogIn,
                isAdmin: false,
                loggedIn: true,
                loadingUser: false,
            })
        }));
        render(<Login />);
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/profile");

        })
    })
})