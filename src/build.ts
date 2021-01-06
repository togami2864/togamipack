import fs from "fs";
import path from "path";
import { absolutePath, relativePath, Graph } from "./types/common";
import { createDependencyGraph } from "./graph/graph";

type IO = {
  entryFile: absolutePath;
  outputDir: absolutePath;
};

type Bundle = {
  name: string;
  code: string;
}[];

const build = ({ entryFile, outputDir }: IO) => {
  const graph: Graph = createDependencyGraph(entryFile);
  const outputFiles: Bundle = createBundle(graph);
  for (const outputFile of outputFiles) {
    fs.writeFileSync(
      path.join(outputDir, outputFile.name),
      outputFile.code,
      "utf-8"
    );
  }
};
