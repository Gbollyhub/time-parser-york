import parse from "./parse";

// Example input strings for the parser.
const inputDataList = ["now()+1d", "now()+8d", "now()+10d+12h", "now()-2d+12h"];

// Parse each expression and log the resulting ISO timestamp.
inputDataList.forEach((inputData) => {
  const result = parse(inputData);
  console.log(`Input Data: ${inputData} => Result: ${result.toISOString()}`);
});