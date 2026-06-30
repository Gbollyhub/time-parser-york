import { TIME_UNITS } from "./constants";
import { Operator, TimeData, TimeUnit } from "./types";

// Modify the inputData into TimeData type
const modifyInputData = (inputData: string) => {
  const records: TimeData[] = [];
  const stringSplit = inputData.matchAll(/([+-])(\w+)/g);

  for (const [, operator, value] of stringSplit) {
    const match = value.match(/(\d+)(\w+)/);
    if (!match) throw new Error(`Unknown Value`);

    const unit = match[2];
    if (!Object.prototype.hasOwnProperty.call(TIME_UNITS, unit)) {
      throw new Error(`Unknown time unit`);
    }

    records.push({
      operator: operator as Operator,
      value: parseInt(match[1], 10),
      unit: unit as TimeUnit,
    });
  }

  return records;
};

// Loop through the timedata array and apply each calculation
const applyDateTimeCalc = (modifiedInputData: TimeData[]) => {
  let modifiedValue = Date.now();
  for (const item of modifiedInputData) {
    const offset = item.value * TIME_UNITS[item.unit];
    modifiedValue =
      item.operator === "+" ? modifiedValue + offset : modifiedValue - offset;
  }

  return modifiedValue;
};

// Parse a time expression such as "now()+1d+12h" and return the result
// as an ISO-formatted date string.
const parse = (inputData: string) => {
  if (!inputData.startsWith("now()"))
    throw new Error(
      'Invalid Input Expression: Expression must start with "now()"',
    );

  const modifiedInputData = modifyInputData(inputData);
  const dateTimeResult = applyDateTimeCalc(modifiedInputData);
  return new Date(dateTimeResult);
};

export default parse;
