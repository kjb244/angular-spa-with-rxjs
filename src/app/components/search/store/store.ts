import { BehaviorSubject } from 'rxjs';

export interface SearchFilter {
  search?: string;
  age?: string[];
  date?: string;
}

export const SearchFilterSubject = new BehaviorSubject<SearchFilter>({});
