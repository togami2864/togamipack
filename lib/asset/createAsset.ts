import { readFileSync } from "fs";
import { absolutePath } from "../types/common";
import { assetGenerator } from "./assetGenerator";

export const createAsset = (filePath: absolutePath) => {
  const content = readFileSync(filePath, "utf-8");
  return new assetGenerator(filePath, content);
};
