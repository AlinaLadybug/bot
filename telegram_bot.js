const parser = require("./parser").then(() => {});
const { PARSER } = parser;

let main = async () => {
  let parsedDays = await parser.main();
  console.log(parsedDays);
};

main();
