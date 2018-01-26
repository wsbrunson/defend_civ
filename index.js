const { runSimulation } = require("./simulation");
const { rollDice } = require("./rollDice");

const successCallback = ({ initialCitizens, citizens }) => {
  console.log(`
    Success! The Evil Empire has been banished!
    We lost ${initialCitizens - citizens} citizens during the struggle.
  `);
};
runSimulation({
  successCallback,
  rollDice
});
