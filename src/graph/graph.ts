import fs from "fs";
import path from "path";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import babel from "@babel/core";
import { absolutePath, relativePath } from "../types/common";
import { typeChecker } from "../typeChecker/typeChecker";
import { Graph } from "../types/common";

let ID = 0;

export const createDependencyGraph = (entryFile: absolutePath) => {
  typeChecker(entryFile);
  const rootModule = createModule(entryFile);
  const queue = [rootModule];
  for (const asset of queue) {
    const dirName = path.dirname(asset.filePath);
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirName, relativePath);
      typeChecker(absolutePath);
      const childModule = createModule(absolutePath);
      asset.mapping[relativePath] = childModule.id;
      queue.push(childModule);
    });
  }
  return queue;
};

const createModule = (filePath: absolutePath) => {
  const content = fs.readFileSync(filePath, "utf-8");
  return new Module(filePath, content);
};

class Module {
  filePath: absolutePath;
  id: number;
  dependencies: relativePath[];
  code: string;
  mapping: object;
  constructor(filePath: absolutePath, content) {
    this.filePath = filePath;
    this.id = ID++;
    this.dependencies = this.findDependency(content);
    this.code = this.transpileCode(content);
    this.mapping = {};
  }
  findDependency(content) {
    const dependencies: relativePath[] = [];
    const ast = parse(content, {
      sourceType: "module",
    });
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  }
  transpileCode(content) {
    const { code } = babel.transformSync(content, {
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    });
    return code;
  }
}
