import path from "path";
import { createAsset } from "../asset/createAsset";
import { absolutePath, relativePath } from "../types/common";

export const createDependencyGraph = (entryFile: absolutePath) => {
  const rootAsset = createAsset(entryFile);
  const queue = [rootAsset];
  for (const asset of queue) {
    const dirName = path.dirname(asset.filePath);
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirName, relativePath);
      const childModule = createAsset(absolutePath);
      asset.mapping[relativePath] = childModule.id;
      queue.push(childModule);
    });
  }
  return queue;
};

console.log(createDependencyGraph("test/example/valid"));
