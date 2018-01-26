const { runSimulation } = require("../simulation");

jest.useFakeTimers();
const originalLog = console.log;

describe("run simulation", () => {
  beforeAll(() => {
    console.log = () => {};
  });
  afterAll(() => {
    console.log = originalLog;
  });

  afterEach(() => {
    clearInterval.mockClear();
  });

  fdescribe("when first roll is 20", () => {
    it("should exit immediately", () => {
      const successCallback = jest.fn();
      const rollDice = jest.fn(() => 20);

      runSimulation({
        successCallback,
        rollDice
      });

      jest.runAllTimers();

      expect(successCallback).toHaveBeenCalledTimes(1);
      expect(successCallback).toHaveBeenCalledWith({
        initialCitizens: 10,
        citizens: 10
      });
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });
  });

  describe("when third roll is 20", () => {
    it("should exit after running three times", () => {
      rollDice
        .mockReturnValueOnce(12)
        .mockReturnValueOnce(8)
        .mockReturnValueOnce(20);

      runSimulation();

      jest.runAllTimers();

      expect(rollDice).toHaveBeenCalledTimes(3);
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });
  });

  describe("when a 20 is never rolled", () => {
    it("should exit after running 10 times", () => {
      rollDice.mockReturnValue(12);

      runSimulation();

      jest.runAllTimers();

      expect(rollDice).toHaveBeenCalledTimes(10);
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });
  });
});
