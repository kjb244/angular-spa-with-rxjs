import {BehaviorSubject} from "rxjs";

export enum FilterSearchEnum {
  'FILTER_AGE'='FILTER_AGE',
  'SEARCH'='SEARCH'
}

export type SearchFilter = Record<keyof typeof FilterSearchEnum, string[]> | {};

export const SearchFilterSubject = new BehaviorSubject<SearchFilter>({});
