const ms = 1000;
const s = ms * 1;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const mon = d * 30;
const y = d * 365;

const string = "now()+2d-3h";

const getLogic = (unit: string): number => {
  switch (unit) {
    case "s":
      return s;
    case "m":
      return m;
    case "h":
      return h;
    case "d":
      return d;
    case "mon":
      return mon;
    case "y":
      return y;
    default:
      throw new Error(`Unknown time unit: ${unit}`);
  }
};

const parseDateTime = (dateTimeString: string) => {
  if (!dateTimeString.startsWith("now()"))
    throw new Error(`Invalid Date Expression`);
  let final = Date.now();
  const records = [];

  const stringSplit = dateTimeString.matchAll(/([+-])(\w+)/g);

  for (const [, operator, value] of stringSplit) {
    const match = value.match(/(\d+)(\w+)/);
    if (!match) throw new Error(`Unknown Value`);
    records.push({
      operator,
      value: match[1],
      unit: match[2],
    });
  }

  for (const item of records) {
    if (item.operator === "+") {
      final = final + parseInt(item.value) * getLogic(item.unit);
    } else {
      final = final - parseInt(item.value) * getLogic(item.unit);
    }
  }

  const finalResult = new Date(final).toISOString();

  return finalResult;
};

const result = parseDateTime(string);

console.log(result);