import request from "supertest";
import app from "../app.js";

describe("Users API", () => {

  it.skip("should return a list of users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/this-route-does-not-exist");
    expect(res.statusCode).toBe(404);
  });

});
