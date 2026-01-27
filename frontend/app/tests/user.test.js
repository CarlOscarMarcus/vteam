import { describe, it, expect, vi } from "vitest";
import { fetchCurrentUser } from "../app/(dashboard)/userBackend";
import { getToken } from "../components/Token";

vi.mock("../components/Token", () => ({
  getToken: vi.fn(),
}));

global.fetch = vi.fn();

describe("userBackend", () => {
  it("hämtar inloggad användare", async () => {
    getToken.mockResolvedValue("test-token");

    const mockUser = {
      name: "Test User",
      email: "test@example.com",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await fetchCurrentUser();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/users/me"),
      expect.objectContaining({
        method: "GET",
      })
    );

    expect(user.name).toBe("Test User");
    expect(user.email).toBe("test@example.com");
  });

  it("kastar fel om token saknas", async () => {
    getToken.mockResolvedValue(null);

    await expect(fetchCurrentUser()).rejects.toThrow("Ingen token");
  });

  it("kastar fel om backend svarar med error", async () => {
    getToken.mockResolvedValue("test-token");

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(fetchCurrentUser()).rejects.toThrow(
      "Kunde inte hämta användaren."
    );
  });
});
