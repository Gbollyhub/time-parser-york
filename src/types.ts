export type TimeUnit = 's' | 'm' | 'h' | 'd' | 'mon' | 'y';

export type Operator = '+' | '-';

export interface TimeData {
    operator: Operator;
    value: number;
    unit: TimeUnit;
}