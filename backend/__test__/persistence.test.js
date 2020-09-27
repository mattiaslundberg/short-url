const { getFromDb, saveToDb, generateShortUrl } = require("../persistence");

describe("generateShortUrl", () => {
  it("generates 12 character string", () => {
    expect(generateShortUrl()).toHaveLength(12);
  });
});

describe("saveToDb/getFromDb", () => {
  it("persists to database and loads", async () => {
    await saveToDb("short", "long");
    const fromDb = await getFromDb("short");
    expect(fromDb).toBe("long");
  });
});

describe("getFromDb", () => {
  it("rejects on nonexisting key", () => {
    expect(async () => {
      await getFromDb("nonexisting");
    }).rejects.toThrow();
  });
});
