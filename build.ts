const fs = require("fs");
const { path } = require("path");

type absolutePath = string;
type relativePath = string;

type IO = {
  entryFile: absolutePath;
  outputDir: absolutePath;
};

type Graph = {
  id: number;
  filePath: relativePath;
  dependency: relativePath[];
  code: string;
}[];

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
