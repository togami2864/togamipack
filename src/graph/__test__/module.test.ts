import { Module } from "../graph";
import { readFileSync } from "fs";

describe("Module Class", () => {
  const content = readFileSync("example/index.ts", "utf-8");
  const filePath = "example/__test__/index.ts";
  let module;
  beforeEach(() => {
    module = new Module(filePath, content);
  });
  it("test", () => {
    expect(module.dependencies).toHaveLength(1);
  });
});
