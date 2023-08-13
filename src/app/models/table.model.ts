
export interface FilterType {
  id: string;
  value: string;
}

export type Data = string[];

export interface TableData {
  header: string[],
  data: Data[]
}

export type SortingDirection = {
  direction: string|null;
}

export interface SortingMap {
  [key: number] : SortingDirection
}
