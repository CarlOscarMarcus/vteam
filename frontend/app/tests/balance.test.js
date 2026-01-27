import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fetchBalanceBackend,
  topUpBalanceBackend,
} from "../app/(dashboard)/balanceBackend";

vi.mock("../components/Token.jsx", () => ({
  getToken: vi.fn(() => Promise.resolve("fake-token")),
}));

describe("Balance backend", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("hämtar saldo korrekt", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ balance: 250 }),
    });

    const balance = await fetchBalanceBackend();

    expect(balance).toBe(250);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("fyller på saldo korrekt", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ balance: 400 }),
    });

    const newBalance = await topUpBalanceBackend("150");

    expect(newBalance).toBe(400);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("kastar fel vid ogiltigt belopp", async () => {
    await expect(
      topUpBalanceBackend("abc")
    ).rejects.toThrow("Ange ett giltigt belopp");
  });

  it("kastar fel om backend misslyckas", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(
      fetchBalanceBackend()
    ).rejects.toThrow("Kunde inte hämta saldo");
  });
});
