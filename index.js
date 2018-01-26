const { runSimulation } = require("./simulation");
const Chance = require("chance");
const chance = new Chance();

const successCallback = ({ initialCitizens, citizens }) => {
  // eslint-disable-next-line no-console
  console.log(`
    Success! The Evil Empire has been banished!
    We lost ${initialCitizens - citizens} citizens during the struggle.
  `);
};

const failureCallback = ({ citizens }) => {
  // eslint-disable-next-line no-console
  console.log(`
    A citizan was sacraficed while trying to banish the evil empire.
    ${citizens} remain.
  `);
};

const outOfCitizensCallback = () => {
  // eslint-disable-next-line no-console
  console.log(`
    Oh no! We have no more available citizens to fight!
  `);
};

const executeTest = () => chance.d20() === 20;

runSimulation({
  successCallback,
  failureCallback,
  outOfCitizensCallback,
  executeTest
});
