import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseReviewFormComponent } from './student-course-review-form.component';

describe('StudentCourseReviewFormComponent', () => {
  let component: StudentCourseReviewFormComponent;
  let fixture: ComponentFixture<StudentCourseReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseReviewFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCourseReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
