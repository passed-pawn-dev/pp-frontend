import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLessonSideListComponent } from './student-lesson-side-list.component';

describe('StudentLessonSideListComponent', () => {
  let component: StudentLessonSideListComponent;
  let fixture: ComponentFixture<StudentLessonSideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLessonSideListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentLessonSideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
