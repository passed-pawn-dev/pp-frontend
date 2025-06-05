import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesQueryParams } from '../../models/course-query-params.model';
import { SortBy } from '../../../shared/enums/sort-by.enum';
import { difficultyRanges } from '../../../shared/constants/difficulty-ranges';
import { InputNumber } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

enum SearchBy {
  Title = 'Title',
  CoachName = 'CoachName'
}

@Component({
  selector: 'app-student-course-filters',
  imports: [ReactiveFormsModule, InputNumber, SelectModule],
  templateUrl: './student-course-filters.component.html',
  styleUrl: './student-course-filters.component.scss'
})
export class StudentCourseFiltersComponent {
  private fb: FormBuilder = inject(FormBuilder);

  @Output() public newQueryParams = new EventEmitter<CoursesQueryParams>();

  protected Array = Array;
  protected SortBy = SortBy;
  protected SearchBy = SearchBy;

  protected difficulties = ['Novice', 'Beginner', 'Intermediate', 'Expert', 'Master'];

  private readonly difficultyRanges: { min: number | null; max: number | null }[] =
    difficultyRanges;

  protected searchOptions = [SearchBy.CoachName, SearchBy.Title];
  protected sortOptions = [SortBy.Popularity, SortBy.Price, SortBy.AverageScore];

  protected searchForm = this.fb.group({
    search: [''],
    searchBy: [SearchBy.Title],
    minDifficulty: [null as null | number],
    maxDifficulty: [null as null | number],
    minPrice: [0],
    maxPrice: [null],
    sortBy: [SortBy.Popularity],
    sortDesc: [false],
    showOwned: [false, Validators.required],
    courseSizeSmall: [true, Validators.required],
    courseSizeMedium: [true, Validators.required],
    courseSizeBig: [true, Validators.required]
  });

  protected get minDifficulty(): number | null {
    return this.searchForm.controls.minDifficulty.value;
  }

  protected get maxDifficulty(): number | null {
    return this.searchForm.controls.maxDifficulty.value;
  }

  protected get searchBy(): SearchBy {
    return this.searchForm.controls.searchBy.value!;
  }

  protected get sortDesc(): boolean | null {
    return this.searchForm.controls.sortDesc.value;
  }

  protected setDifficulty(value: number): void {
    const currentMin = this.searchForm.controls.minDifficulty.value;
    const currentMax = this.searchForm.controls.maxDifficulty.value;
    if (currentMax === null || currentMin === null) {
      this.searchForm.controls.minDifficulty.setValue(value);
      this.searchForm.controls.maxDifficulty.setValue(value);
    } else if (value > currentMax) {
      this.searchForm.controls.maxDifficulty.setValue(value);
    } else if (value < currentMin) {
      this.searchForm.controls.minDifficulty.setValue(value);
    }
  }

  protected resetDifficulty(): void {
    this.searchForm.controls.minDifficulty.setValue(null);
    this.searchForm.controls.maxDifficulty.setValue(null);
  }

  protected toggleSortDesc(): void {
    this.searchForm.controls.sortDesc.setValue(!this.sortDesc);
  }

  protected onSubmit(): void {
    const searchForm = this.searchForm.getRawValue();
    const queryParams: CoursesQueryParams = {
      eloRangeStart:
        searchForm.minDifficulty === null
          ? null
          : this.difficultyRanges[searchForm.minDifficulty - 1].min,
      eloRangeEnd:
        searchForm.maxDifficulty === null
          ? null
          : this.difficultyRanges[searchForm.maxDifficulty - 1].max,
      minPrice: searchForm.minPrice,
      maxPrice: searchForm.maxPrice,
      onlyNonBought: !searchForm.showOwned!,
      sortBy: searchForm.sortBy!,
      sortDesc: searchForm.sortDesc!,
      pageNumber: 1,
      pageSize: 5,
      courseSizeSmall: searchForm.courseSizeSmall!,
      courseSizeMedium: searchForm.courseSizeMedium!,
      courseSizeBig: searchForm.courseSizeBig!
    };
    if (this.searchBy === SearchBy.Title) {
      queryParams.name = searchForm.search;
    } else {
      queryParams.coachName = searchForm.search;
    }
    this.newQueryParams.emit(queryParams);
  }
}
