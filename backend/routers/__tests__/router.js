const request = require("supertest");

const server = require("../../api/server.js");

describe("router.js", () => {
  describe("get /job route", () => {
    it("returns status code 501", async () => {
      let response = await request(server).get("/job");
      expect(response.status).toBe(501);
    });
  });

  describe("get /job/:id route", () => {
    it("returns status code 500", async () => {
      let response = await request(server).get("/job/:id");
      expect(response.status).toBe(200);
    });
  });

  describe("post /job route", () => {
    it("returns status code 500", async () => {
      let response = await request(server)
        .post("/")
        .send();
      expect(response.status).toBe(500);
    });
  });

  describe("delete /job:/id route", () => {
    it("returns status code 500", async () => {
      let response = await request(server).delete("/:id");
      expect(response.status).toBe(500);
    });
  });
});
