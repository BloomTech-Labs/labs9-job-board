const request = require("supertest");

const server = require("../../api/server.js");

describe("router.js", () => {
  describe("get /job route", () => {
    // it("returns status code 200", async () => {
    //   let response = await request(server).get("/job");
    //   expect(Array.isArray(response.body)).toBeTruthy();
    // });
    // it("returns json", async () => {
    //   let response = await request(server).get("/job");
    //   expect(response.type).toBe("application/json");
    // });
    it("returns status code 200 if successful", async () => {
      let response = await request(server).get("/job");
      expect(response.status).toBe(200);
    });
  });

  describe("get /job/:id route", () => {
    it("returns status code 200 if successful", async () => {
      let response = await request(server).get("/job/:id");
      expect(response.status).toBe(200);
    });
  });

  describe("post /job route", () => {
    it("returns status code 500 if failed", async () => {
      let response = await request(server)
        .post("/")
        .send();
      expect(response.status).toBe(500);
    });
  });
});
