const request = require("supertest");
const { getFromDb } = require("../persistence");

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

  it("persists to database", async () => {
    const res = await request(server).post("/").send({
      longUrl: "https://mlundberg.se/something/other/thing",
    });
    expect(res.statusCode).toBe(200);

    const shortUrl = res.body.shortUrl;

    const fromDb = await getFromDb(shortUrl);
    expect(fromDb).toBe("https://mlundberg.se/something/other/thing");
  });

  beforeEach(() => {
    server = require("../index");
  });

  afterEach(() => {
    server.close();
  });
});
