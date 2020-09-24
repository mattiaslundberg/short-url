const { generateShortUrl } = require("../persistence");

describe("generateShortUrl", () => {
  it("generates 12 character string", () => {
    expect(generateShortUrl()).toHaveLength(12);
  });
});
