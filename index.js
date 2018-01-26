const { runSimulation } = require("./simulation");
const { postTweet } = require("./twitterService");
const Chance = require("chance");
const chance = new Chance();

const successCallback = ({ initialCitizens, citizens }) => {
  const text = `
    Success! The Evil Empire has been banished!
    We lost ${initialCitizens - citizens} citizens during the struggle.
  `;

  postTweet(text);
};

const failureCallback = ({ citizens }) => {
  const text = `
    A citizan was sacraficed while trying to banish the evil empire.
    ${citizens} remain.
  `;
  postTweet(text);
};

const outOfCitizensCallback = () => {
  const text = `
    Oh no! We have no more available citizens to fight!
  `;

  postTweet(text);
};

const executeTest = () => chance.d20() === 20;

runSimulation({
  successCallback,
  failureCallback,
  outOfCitizensCallback,
  executeTest
});
