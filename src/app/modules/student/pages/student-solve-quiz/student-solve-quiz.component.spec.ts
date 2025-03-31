import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSolveQuizComponent } from './student-solve-quiz.component';

describe('StudentSolveQuizComponent', () => {
  let component: StudentSolveQuizComponent;
  let fixture: ComponentFixture<StudentSolveQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSolveQuizComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSolveQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
