require('@babel/register')
require('@babel/polyfill')
// require('../cmd/api/main')
const main = require('../cmd/api/main');

module.exports.handler = async () => {
  await main();
  return {
    statusCode: 200,
    body: "Server running successfully!",
  };
};