import request from "supertest";
import app from "../app.js";

describe("Charging API", () => {

  it.skip("should return a list of charging stations", async () => {
    const res = await request(app).get("/api/charging");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/this-route-does-not-exist");
    expect(res.statusCode).toBe(404);
  });

});
