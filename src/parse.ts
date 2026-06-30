import { modifyInputData, applyDateTimeCalc } from "./utils";

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