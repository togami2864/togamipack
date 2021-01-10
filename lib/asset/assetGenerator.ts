import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { transformSync, BabelFileResult } from "@babel/core";
import { absolutePath, relativePath } from "../types/common";
let ID = 0;

export class assetGenerator {
  filePath: absolutePath;
  id: number;
  dependencies: relativePath[];
  code: string;
  mapping: object;
  constructor(filePath: absolutePath, code: string) {
    this.filePath = filePath;
    this.id = ID++;
    this.dependencies = this.findDependency(code);
    this.code = this.transpileToCJS(code);
    this.mapping = {};
  }
  findDependency(code: string) {
    const dependencies: relativePath[] = [];
    const ast = parse(code, {
      sourceType: "module",
    });
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  }
  transpileToCJS(code) {
    code = transformSync(code, {
      filename: this.filePath,
      presets: ["@babel/preset-env"],
    });
    return code;
  }
}
