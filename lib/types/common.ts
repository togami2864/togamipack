export type absolutePath = string;
export type relativePath = string;

export type Graph = {
  id: number;
  filePath: relativePath;
  dependency: relativePath[];
  code: string;
}[];
