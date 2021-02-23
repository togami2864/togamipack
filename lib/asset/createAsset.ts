import fs from "fs";
import path from "path";
import { absolutePath } from "../types/common";
import { Asset } from "./asset";
import { resolveExt } from "../path/path";
import { typeChecker } from "../typeChecker/typeChecker";

export const createAsset = (
  filePath: absolutePath,
  cash: Map<string, Asset>
) => {
  filePath = resolveExt(filePath);
  const code = typeChecker(filePath);
  if (!cash.has(filePath)) {
    const asset = new Asset(filePath, code);
    cash.set(filePath, asset);
  }
  return cash.get(filePath);
};
