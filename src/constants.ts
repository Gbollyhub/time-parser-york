import { TimeUnit } from "./types";

// Common time units values.
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTHS = DAY * 30;
const YEAR = DAY * 365;

// Unit abbreviations to millisecond values mapping.
export const TIME_UNITS: Record<TimeUnit, number> = {
  s: SECOND,
  m: MINUTE,
  h: HOUR,
  d: DAY,
  mon: MONTHS,
  y: YEAR,
};