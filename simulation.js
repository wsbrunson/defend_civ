const runSimulation = ({
  successCallback,
  failureCallback,
  outOfCitizensCallback,
  executeTest
}) => {
  const initialCitizens = 10;
  let citizens = initialCitizens;

  const finishSimulation = setInterval(() => {
    if (executeTest()) {
      successCallback({ initialCitizens, citizens });
      clearInterval(finishSimulation);
    } else {
      citizens -= 1;

      if (citizens === 0) {
        outOfCitizensCallback();
        clearInterval(finishSimulation);
        return;
      }

      failureCallback({
        citizens
      });
    }
  }, 60000);
};

module.exports = { runSimulation };
