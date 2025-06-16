import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAddExerciseComponent } from './coach-add-puzzle.component';

describe('CoachAddExerciseComponent', () => {
  let component: CoachAddExerciseComponent;
  let fixture: ComponentFixture<CoachAddExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachAddExerciseComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachAddExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
