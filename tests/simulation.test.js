const { runSimulation } = require("../simulation");

jest.useFakeTimers();

describe("run simulation", () => {
  afterEach(() => {
    clearInterval.mockClear();
  });

  fdescribe("when first roll is 20", () => {
    it("should exit immediately", () => {
      const successCallback = jest.fn();
      const executeTest = jest.fn(() => true);

      runSimulation({
        successCallback,
        executeTest
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

  fdescribe("when third roll is 20", () => {
    it("should exit after running three times", () => {
      const successCallback = jest.fn();
      const failureCallback = jest.fn();
      const executeTest = jest.fn();
      executeTest
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      runSimulation({
        successCallback,
        failureCallback,
        executeTest
      });

      jest.runAllTimers();

      expect(successCallback).toHaveBeenCalledTimes(1);
      expect(successCallback).toHaveBeenCalledWith({
        citizens: 8,
        initialCitizens: 10
      });
      expect(failureCallback).toHaveBeenCalledTimes(2);
      expect(failureCallback).toHaveBeenCalledWith({ citizens: 9 });
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });
  });

  fdescribe("when a 20 is never rolled", () => {
    it("should exit after running 10 times", () => {
      const failureCallback = jest.fn();
      const outOfCitizensCallback = jest.fn();
      const executeTest = jest.fn(() => false);

      runSimulation({
        failureCallback,
        outOfCitizensCallback,
        executeTest
      });

      jest.runAllTimers();

      expect(failureCallback).toHaveBeenCalledTimes(9);
      expect(failureCallback).toHaveBeenCalledWith({ citizens: 1 });
      expect(outOfCitizensCallback).toHaveBeenCalledTimes(1);
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });
  });
});
