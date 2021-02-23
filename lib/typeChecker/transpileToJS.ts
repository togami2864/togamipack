import fs from "fs";
import * as ts from "typescript";

export const transpileToJS = (filePath): string => {
  const file = fs.readFileSync(filePath, "utf-8");
  const code = ts.transpileModule(file, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2015,
      module: ts.ModuleKind.ESNext,
      noImplicitUseStrict: true,
      pretty: true,
    },
  }).outputText;
  return code;
};
