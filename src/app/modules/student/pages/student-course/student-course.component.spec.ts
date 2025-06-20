import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseComponent } from './student-course.component';

describe('StudentCourseComponent', () => {
  let component: StudentCourseComponent;
  let fixture: ComponentFixture<StudentCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
