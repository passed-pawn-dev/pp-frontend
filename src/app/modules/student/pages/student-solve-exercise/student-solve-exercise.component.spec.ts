import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSolveExerciseComponent } from './student-solve-exercise.component';

describe('StudentSolveExerciseComponent', () => {
  let component: StudentSolveExerciseComponent;
  let fixture: ComponentFixture<StudentSolveExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSolveExerciseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentSolveExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
