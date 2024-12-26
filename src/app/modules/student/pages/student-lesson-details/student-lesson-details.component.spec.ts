import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLessonDetailsComponent } from './student-lesson-details.component';

describe('StudentLessonDetailsComponent', () => {
  let component: StudentLessonDetailsComponent;
  let fixture: ComponentFixture<StudentLessonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLessonDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentLessonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
