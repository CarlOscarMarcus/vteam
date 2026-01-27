import { describe, it, expect, vi } from "vitest";
import { endRideBackend } from "../app/(dashboard)/rideBackend";
import { getToken } from "../components/Token";

vi.mock("../components/Token", () => ({
  getToken: vi.fn(),
}));

global.fetch = vi.fn();

describe("rideBackend", () => {
  it("avslutar resa och returnerar kvitto", async () => {
    getToken.mockResolvedValue("test-token");

    const mockReceipt = {
      minutes: 10,
      cost: 20,
      batteryLeft: 85,
      endedAt: "2026-01-26",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ receipt: mockReceipt }),
    });

    const receipt = await endRideBackend(123);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/rent/end"),
      expect.objectContaining({
        method: "POST",
      })
    );

    expect(receipt.cost).toBe(20);
    expect(receipt.minutes).toBe(10);
  });

  it("kastar fel om backend svarar med error", async () => {
    getToken.mockResolvedValue("test-token");

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Resa hittades inte" }),
    });

    await expect(endRideBackend(999)).rejects.toThrow("Resa hittades inte");
  });
});
