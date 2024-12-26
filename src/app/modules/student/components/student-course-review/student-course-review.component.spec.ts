import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseReviewComponent } from './student-course-review.component';

describe('StudentCourseReviewComponent', () => {
  let component: StudentCourseReviewComponent;
  let fixture: ComponentFixture<StudentCourseReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseReviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCourseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
