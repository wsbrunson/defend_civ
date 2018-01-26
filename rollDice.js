const Chance = require("chance");
const chance = new Chance();

const rollDice = chance.d20;

module.exports = { rollDice };
