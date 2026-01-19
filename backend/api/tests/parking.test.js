import request from "supertest";
import app from "../app.js";

describe("Parking API", () => {

  it.skip("should return a list of parking spots", async () => {
    const res = await request(app).get("/api/parking");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/this-route-does-not-exist");
    expect(res.statusCode).toBe(404);
  });

});
