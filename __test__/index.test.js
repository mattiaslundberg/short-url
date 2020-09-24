const request = require("supertest");

describe("/", () => {
  let server;
  it("returns successful response", async () => {
    const res = await request(server).get("/").send();

    expect(res.statusCode).toBe(200);
  });

  beforeEach(() => {
    server = require("../index");
  });

  afterEach(() => {
    server.close();
  });
});
