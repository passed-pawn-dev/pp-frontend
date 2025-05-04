import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLessonComponent } from './student-lesson.component';

describe('StudentLessonComponent', () => {
  let component: StudentLessonComponent;
  let fixture: ComponentFixture<StudentLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLessonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
