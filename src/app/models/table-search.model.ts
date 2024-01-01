import {Data} from "./table.model";

export enum ValidKeywords {
  LESS_THAN = '<',
  LESS_THAN_EQUALS = '<=',
  GREATER_THAN = '>',
  GREATER_THAN_EQUALS = '>=',
  EQUALS = '=',
  BETWEEN = 'between',
  IN = 'in'
}

export enum ComparisonType {
  LESS_THAN_GREATER_THAN_EQUALS = 'LESS_THAN_GREATER_THAN_EQUALS',
  EQUALS = 'EQUALS',
  IN = 'IN',
  BETWEEN = 'BETWEEN',
  NULL = 'NULL'
}

export interface SqlResults  {
  valid: boolean;
  data?: Data[];
}

export enum ValidPlusMinus {
  TODAY = 'TODAY',
  TODAY_PlUS_MINUS = 'TODAY_PLUS_MINUS',
  NULL = 'NULL'
}
