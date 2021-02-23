import { Asset } from "../lib/asset/asset";
import { readFileSync } from "fs";

describe("assetGenerator", () => {
  const content = readFileSync("test/example/valid.ts", "utf-8");
  const filePath = "test/example/valid.ts";
  const module = new Asset(filePath, content);
  it("should contain valid property", () => {
    expect(module.dependencies).toHaveLength(1);
  });
});
