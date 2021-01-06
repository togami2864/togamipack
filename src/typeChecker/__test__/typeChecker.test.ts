import { typeChecker } from "../typeChecker";
import { mockProcessExit } from "jest-mock-process";

describe("typeChecker", () => {
  it("compiled successfully", () => {
    const consoleMock = jest.spyOn(console, "log");
    const result = typeChecker("example/__test__/typeChecker/success.ts");
    expect(consoleMock).toHaveBeenCalledWith("There are no Type Error");
  });
  it("type error", () => {
    const consoleMock = jest.spyOn(console, "error");
    const exitMock = mockProcessExit();
    typeChecker("example/__test__/typeChecker/error.ts");
    expect(consoleMock).toHaveBeenCalledWith("Error Occurred");
    expect(exitMock).toHaveBeenCalledWith(1);
  });
});
