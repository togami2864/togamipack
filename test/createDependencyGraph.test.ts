import { createDependencyGraph } from "../lib/graph/graph";

describe("create Dependency Graph", () => {
  const path = "test/example/valid.ts";
  console.log(createDependencyGraph(path));
});
