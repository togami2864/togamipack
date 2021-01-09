import { readFileSync } from "fs";
import path = require("path");
import { createAsset } from "../asset/createAsset";
import { absolutePath, relativePath } from "../types/common";
import { typeChecker } from "../typeChecker/typeChecker";

export const createDependencyGraph = (entryFile: absolutePath) => {
  typeChecker(entryFile);
  const rootAsset = createAsset(entryFile);
  const queue = [rootAsset];
  for (const asset of queue) {
    const dirName = path.dirname(asset.filePath);
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirName, relativePath);
      typeChecker(absolutePath);
      const childModule = createAsset(absolutePath);
      asset.mapping[relativePath] = childModule.id;
      queue.push(childModule);
    });
  }
  return queue;
};
