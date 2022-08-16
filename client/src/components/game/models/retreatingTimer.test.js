import RetreatingTimer from "./retreatingTimer";

jest.useFakeTimers();

let mockGhost;
let retreatingTimer;

describe("RetreatingTimer", () => {
  beforeEach(() => {
    mockGhost = {
      isRetreating: true,
      changeRetreatingState: () => undefined,
    };
    retreatingTimer = new RetreatingTimer(mockGhost);
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(retreatingTimer.timeout).toBeNull();
      expect(retreatingTimer.ghost).toEqual(mockGhost);
      expect(retreatingTimer.startTime).toBeNull();
      expect(retreatingTimer.timeRemaining).toBeNull();
      expect(retreatingTimer.isRunning).toBeFalsy();
    });
  });

  describe("start", () => {
    it("sets the timeout to call changeRetreatingState after a delay of three seconds", () => {
      jest.spyOn(global, "setTimeout");
      jest.spyOn(mockGhost, "changeRetreatingState");
      retreatingTimer.start();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
      expect(retreatingTimer.timeout).not.toBeNull();
      expect(retreatingTimer.isRunning).toBeTruthy();
      jest.runOnlyPendingTimers();
      expect(mockGhost.changeRetreatingState).toHaveBeenCalledTimes(1);
      expect(retreatingTimer.isRunning).toBeFalsy();
    });

    it("sets the startTime equal to the Date.now()", () => {
      const mockDateNow = 128460;
      retreatingTimer.start(mockDateNow);
      expect(retreatingTimer.startTime).toBe(mockDateNow);
    });
  });

  describe("pause", () => {
    it("calls clearTimeout and saves the time remaining in this.timeRemaining", () => {
      jest.spyOn(global, "clearTimeout");
      retreatingTimer.startTime = 3960;
      const mockDateNow = 5620;
      retreatingTimer.pause(mockDateNow);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(retreatingTimer.timeout);
      expect(retreatingTimer.timeRemaining).toBe(1340);
    });
  });

  describe("reset", () => {
    it("calls clearTimeout on this.timeout", () => {
      jest.spyOn(global, "clearTimeout");
      retreatingTimer.isRunning = true;
      retreatingTimer.reset();
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(retreatingTimer.timeout);
      expect(retreatingTimer.isRunning).toBeFalsy();
    });
  });
});
