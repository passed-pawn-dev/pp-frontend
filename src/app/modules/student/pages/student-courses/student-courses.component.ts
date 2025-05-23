import { Component, DestroyRef, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { StudentCourseTileComponent } from '../../components/student-course-tile/student-course-tile.component';
import { CourseService } from '../../services/course.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StudentCourseFiltersComponent } from '../../components/student-course-filters/student-course-filters.component';
import { CoursesQueryParams } from '../../models/course-query-params.model';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Pagination } from '../../../shared/models/pagination.model';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [StudentCourseTileComponent, StudentCourseFiltersComponent, PaginatorModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.scss'
})
export class StudentCoursesComponent implements OnInit {
  private cdRef = inject(ChangeDetectorRef);
  protected courses: Course[] = [];

  protected totalRecords: number = 0;
  protected first: number = 1;
  protected currentQueryParams: CoursesQueryParams = {
    eloRangeStart: null,
    eloRangeEnd: null,
    minPrice: null,
    maxPrice: null,
    onlyNonBought: true,
    sortBy: null,
    sortDesc: false,
    pageNumber: 1,
    pageSize: 5,
    courseSizeSmall: true,
    courseSizeMedium: true,
    courseSizeBig: true
  };

  public constructor(
    private courseService: CourseService,
    private readonly destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.fetchCourses(this.currentQueryParams);
  }

  protected onPageChange(paginatorState: PaginatorState): void {
    this.fetchCourses({
      ...this.currentQueryParams,
      pageNumber: paginatorState.page! + 1,
      pageSize: paginatorState.rows!
    });
  }

  protected onNewFilters(queryParams: CoursesQueryParams): void {
    this.fetchCourses(queryParams);
    this.currentQueryParams = queryParams;
  }

  protected fetchCourses(queryParams: CoursesQueryParams): void {
    this.courseService
      .getAll(queryParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.courses = [];
        this.cdRef.detectChanges();
        this.courses = res.body!;
        const pagination: Pagination = JSON.parse(res.headers.get('pagination')!);
        this.totalRecords = pagination.totalItems;
        this.first = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
      });
  }
}
