import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseFiltersComponent } from './student-course-filters.component';

describe('StudentCourseFiltersComponent', () => {
  let component: StudentCourseFiltersComponent;
  let fixture: ComponentFixture<StudentCourseFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseFiltersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCourseFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
