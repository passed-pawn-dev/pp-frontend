import { SortBy } from '../../shared/enums/sort-by.enum';

export interface CoursesQueryParams {
  eloRangeStart: number | null;
  eloRangeEnd: number | null;
  name?: string | null;
  coachName?: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  onlyNonBought: boolean;
  sortBy: SortBy | null;
  sortDesc: boolean;
  pageNumber: number;
  pageSize: number;
  courseSizeSmall: boolean;
  courseSizeMedium: boolean;
  courseSizeBig: boolean;
}
