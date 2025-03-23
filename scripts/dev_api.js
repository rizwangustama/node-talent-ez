require('@babel/register')
require('@babel/polyfill')
// require('../cmd/api/main')
const main = require('../cmd/api/main');

module.exports.handler = async () => {
  console.log("🚀 Starting API handler...");
  await main();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "API is running!" }),
  };
};

// Jika ingin langsung jalan tanpa genezio:
if (require.main === module) {
  main();
}