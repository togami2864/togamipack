import fs from "fs";
import path from "path";
import { absolutePath } from "../types/common";
import { assetGenerator } from "./assetGenerator";
import { resolveExt } from "../path/path";
import { typeChecker } from "../typeChecker/typeChecker";

export const createAsset = (filePath: absolutePath) => {
  filePath = resolveExt(filePath);
  const code = typeChecker(filePath);
  return new assetGenerator(filePath, code);
};
