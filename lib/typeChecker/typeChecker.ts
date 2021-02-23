import * as ts from "typescript";
import { absolutePath } from "../types/common";
import { transpileToJS } from "./transpileToJS";

const TYPE_ERROR = 1;

export const typeChecker = (filePath: absolutePath): string => {
  let diagnostics = ts.getPreEmitDiagnostics(
    ts.createProgram([filePath], {
      strict: true,
      target: ts.ScriptTarget.Latest,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    })
  );
  if (diagnostics.length) {
    diagnostics.forEach((d) => console.error(d.messageText));
    process.exit(TYPE_ERROR);
  } else {
    return transpileToJS(filePath);
  }
};
