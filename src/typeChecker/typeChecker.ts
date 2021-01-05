import * as ts from "typescript";
import { absolutePath } from "../types/common";

const TYPE_ERROR = 1;

export const typeChecker = (entryFile: absolutePath): void => {
  let diagnostics = ts.getPreEmitDiagnostics(
    ts.createProgram([entryFile], {
      strict: true,
      target: ts.ScriptTarget.Latest,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    })
  );
  if (diagnostics.length) {
    diagnostics.forEach((d) => console.log(d.messageText));
    console.error("Error Occurred");
    process.exit(TYPE_ERROR);
  } else {
    console.log("Compiled Successfully");
  }
};
