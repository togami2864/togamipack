import fs from "fs";
import path from "path";
import { absolutePath } from "../types/common";
import { Asset } from "./asset";
import { resolveExt } from "../path/path";
import { typeChecker } from "../typeChecker/typeChecker";

export const createAsset = (filePath: absolutePath) => {
  filePath = resolveExt(filePath);
  const code = typeChecker(filePath);
  return new Asset(filePath, code);
};
