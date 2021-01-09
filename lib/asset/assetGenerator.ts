import { readFileSync } from "fs";
import path = require("path");
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { transformSync } from "@babel/core";
import { absolutePath, relativePath } from "../types/common";
let ID = 0;

export class assetGenerator {
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
    const { code } = transformSync(content, {
      filename: this.filePath,
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    });
    return code;
  }
}
