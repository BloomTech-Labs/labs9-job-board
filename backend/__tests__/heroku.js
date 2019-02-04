const request = require("supertest");
const axios = require("axios");

const server = require("../api/server.js");

// tests for Heroku deployed server
const URL = "https://knowledge-without-college.herokuapp.com";

// tests for the GET test endpoint
describe("Test endpoint on deployed API", () => {
  it("GET /test should return a JSON object", async () => {
    let response = await axios.get(`${URL}/test`);
    expect(typeof response.data).toEqual("object");
  });

  it('GET /test should return {"server": "running"}', async () => {
    let response = await axios.get(`${URL}/test`);
    expect(response.data).toEqual({ server: "running" });
  });
});

describe("User endpoint on deployed API", () => {
  it("GET /api/users should return a JSON object", async () => {
    let response = await axios.get(`${URL}/api/users`);
    expect(typeof response.data).toEqual("object");
  });
});
