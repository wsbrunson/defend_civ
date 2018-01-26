const Twitter = require("twitter");
const { secrets } = require("./secrets");

const client = new Twitter(secrets);

const postTweet = status =>
  client.post("statuses/update", { status }, error => {
    if (error) throw error;
  });

module.exports = { postTweet };
