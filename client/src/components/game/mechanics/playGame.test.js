import playGame from "./playGame";

let mockName;
let mockReactRoot;
let mockFinishSetup;
let mockImplementObjects;
let mockUpdateDisplay;
let mockCtx;
let mockBoard;

describe("playGame", () => {
  beforeEach(() => {
    mockName = "John";
    mockReactRoot = "reactRoot";
    mockFinishSetup = jest.fn();
    mockImplementObjects = jest.fn();
    mockUpdateDisplay = jest.fn();
    jest.spyOn(global, "requestAnimationFrame");
    jest.spyOn(document, "querySelector");
    mockCtx = {
      clearRect: () => undefined,
    };
    jest.spyOn(mockCtx, "clearRect");
    mockBoard = {
      getContext: () => undefined,
    };
    jest.spyOn(mockBoard, "getContext");
    document.querySelector.mockReturnValue(mockBoard);
    mockBoard.getContext.mockReturnValue(mockCtx);
  });

  it("calls the necessary functions to run the game", () => {
    playGame(
      mockName,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay
    );
    expect(mockFinishSetup).toHaveBeenCalledTimes(1);
    expect(mockImplementObjects).toHaveBeenCalledTimes(1);
    expect(mockUpdateDisplay).toHaveBeenCalledTimes(1);
  });

  it("calls requestAnimationFrame", () => {
    playGame(
      mockName,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay
    );
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(requestAnimationFrame).toHaveBeenCalledWith(playGame);
  });

  it("finds the board element and calls getContext and clearRect on it", () => {
    playGame(
      mockName,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay
    );
    expect(document.querySelector).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenCalledWith("#board");
    expect(mockBoard.getContext).toHaveBeenCalledTimes(1);
    expect(mockBoard.getContext).toHaveBeenCalledWith("2d");
    expect(mockCtx.clearRect).toHaveBeenCalledTimes(1);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 896, 992);
  });
});
