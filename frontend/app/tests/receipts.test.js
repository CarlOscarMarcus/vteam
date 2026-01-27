import { describe, it, expect, vi } from "vitest";
import { fetchReceipts, payReceiptBackend } from "../app/(dashboard)/receiptsBackend";
import { getToken } from "../components/Token";

vi.mock("../components/Token", () => ({
  getToken: vi.fn(),
}));

global.fetch = vi.fn();

describe("receiptsBackend", () => {
  it("hämtar kvitton", async () => {
    getToken.mockResolvedValue("token");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, cost: 50, payment: 0 }],
    });

    const data = await fetchReceipts();
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(1);
  });

  it("betalar kvitto", async () => {
    getToken.mockResolvedValue("token");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ paid: 50 }),
    });

    const paid = await payReceiptBackend(1);
    expect(paid).toBe(50);
  });
});
