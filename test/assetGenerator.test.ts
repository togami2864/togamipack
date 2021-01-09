import { assetGenerator } from "../lib/asset/assetGenerator";
import { readFileSync } from "fs";

describe("assetGenerator", () => {
  const content = readFileSync("test/example/valid.ts", "utf-8");
  const filePath = "test/example/valid.ts";
  const module = new assetGenerator(filePath, content);
  it("should contain valid property", () => {
    expect(module.dependencies).toHaveLength(1);
  });
});
