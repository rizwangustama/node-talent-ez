require('@babel/register')
require('@babel/polyfill')
// require('../cmd/api/main')
const main = require('../cmd/api/main');

module.exports.handler = async () => {
  try {
    console.log("🚀 Starting API...");
    await main();
    return {
      statusCode: 200,
      body: "Server running successfully!",
    };
  } catch (error) {
    console.error("❌ Error in handler:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};