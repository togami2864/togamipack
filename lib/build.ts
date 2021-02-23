import fs from "fs";
import path from "path";
import { absolutePath, relativePath, Graph } from "./types/common";
import { createDependencyGraph } from "./graph/graph";
import { createBundle } from "./createBundle";

type IO = {
  entryFile: absolutePath;
  outputDir: absolutePath;
};

type Bundle = {
  name: string;
  code: string;
}[];

const build = ({ entryFile, outputDir }: IO) => {
  const graph = createDependencyGraph(entryFile);
  console.log(graph);
  const outputFiles = createBundle(graph);
  for (const outputFile of outputFiles) {
    fs.writeFileSync(
      path.join(outputDir, outputFile.name),
      outputFile.code,
      "utf-8"
    );
  }
};
const result: IO = { entryFile: "example/index", outputDir: "dist" };
build(result);
