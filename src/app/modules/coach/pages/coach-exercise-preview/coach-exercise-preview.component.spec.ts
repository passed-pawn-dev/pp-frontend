import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachExercisePreviewComponent } from './coach-exercise-preview.component';

describe('CoachExercisePreviewComponent', () => {
  let component: CoachExercisePreviewComponent;
  let fixture: ComponentFixture<CoachExercisePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachExercisePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachExercisePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
