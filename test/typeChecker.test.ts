import { typeChecker } from "../lib/typeChecker/typeChecker";
import { mockProcessExit } from "jest-mock-process";

describe("typeChecker", () => {
  describe("No typeError", () => {
    it("should be compile successfully", () => {
      const consoleMock = jest.spyOn(console, "log");
      const result = typeChecker("test/example/success.ts");
      expect(consoleMock).toHaveBeenCalledWith("There are no Type Error");
    });
  });
  describe("typeError", () => {
    it("should be occur error and get an error message", () => {
      const consoleMock = jest.spyOn(console, "error");
      const exitMock = mockProcessExit();
      typeChecker("test/example/error.ts");
      expect(consoleMock).toHaveBeenCalled();
      expect(exitMock).toHaveBeenCalledWith(1);
    });
  });
});
