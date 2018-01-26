const { rollDice } = require("./rollDice");

const runSimulation = ({ successCallback, rollDice }) => {
  const initialCitizens = 10;
  let citizens = initialCitizens;

  const finishSimulation = setInterval(() => {
    const roll = rollDice();

    if (roll === 20) {
      // eslint-disable-next-line no-console
      successCallback({ initialCitizens, citizens });

      clearInterval(finishSimulation);
    } else {
      citizens -= 1;

      if (citizens === 0) {
        // eslint-disable-next-line no-console
        console.log(`
      Oh no! We have no more available citizens to fight!
       `);
        clearInterval(finishSimulation);
        return;
      }

      // eslint-disable-next-line no-console
      console.log(`
      A citizan was sacraficed while trying to banish the evil empire.
      ${citizens} remain.
      Citizen rolled a ${roll}
    `);
    }
  }, 500);
};

module.exports = { runSimulation };
