import path from "path";
import { MessagePort } from "worker_threads";
import { createAsset } from "../asset/createAsset";
import { Asset } from "../asset/asset";
import { absolutePath, relativePath } from "../types/common";

export const createDependencyGraph = (entryFile: absolutePath) => {
  const MODULE_CASH = new Map<string, Asset>();
  const rootAsset = createAsset(entryFile, MODULE_CASH);
  const queue = [rootAsset];
  for (const asset of queue) {
    const dirName = path.dirname(asset.filePath);
    asset.dependencies.forEach((relativePath) => {
      const filePath = path.join(dirName, relativePath);
      const childModule = createAsset(filePath, MODULE_CASH);
      asset.mapping[relativePath] = childModule.id;
      queue.push(childModule);
    });
  }
  return queue;
};
