const request = require("supertest");

const server = require("../api/server.js");

// tests for the GET test endpoint
describe("Test endpoint", () => {
  it("GET /test should return a JSON object", async () => {
    let response = await request(server).get("/test");
    expect(typeof response.body).toEqual("object");
  });

  it('GET /test should return {"server": "running"}', async () => {
    let response = await request(server).get("/test");
    expect(response.body).toEqual({ server: "running" });
  });
});
