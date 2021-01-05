import { absolutePath } from "../types/common";
import { typeChecker } from "../typeChecker/typeChecker";
export const createDependencyGraph = (entryFile: absolutePath) => {
  typeChecker(entryFile);
  console.log("ok");
};
