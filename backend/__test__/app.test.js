const request = require("supertest");
const { getFromDb, saveToDb } = require("../persistence");

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

describe("GET /:shortUrl", () => {
  let server;

  it("redirects on found url", async () => {
    await saveToDb("hello", "https://google.com");
    const res = await request(server).get("/hello").send();

    expect(res.statusCode).toBe(302);
  });

  it("sends error on nonexisting url", async () => {
    const res = await request(server).get("/nonexisting").send();
    expect(res.statusCode).toBe(404);
  });

  beforeEach(() => {
    server = require("../index");
  });

  afterEach(() => {
    server.close();
  });
});
