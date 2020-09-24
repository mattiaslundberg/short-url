const request = require("supertest");

describe("GET /", () => {
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

describe("POST /", () => {
  let server;

  it("creates new shortened link", async () => {
    const res = await request(server).post("/").send({
      longUrl: "https://mlundberg.se/something/other/thing",
    });

    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body)).toContain("longUrl");
    expect(Object.keys(res.body)).toContain("shortUrl");
  });

  beforeEach(() => {
    server = require("../index");
  });

  afterEach(() => {
    server.close();
  });
});
