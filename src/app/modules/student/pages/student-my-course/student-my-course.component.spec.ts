import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyCourseComponent } from './student-my-course.component';

describe('CourseComponent', () => {
  let component: StudentMyCourseComponent;
  let fixture: ComponentFixture<StudentMyCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMyCourseComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
