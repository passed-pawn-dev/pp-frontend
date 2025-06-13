import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachQuizEditComponent } from './coach-quiz-edit.component';

describe('CoachQuizEditComponent', () => {
  let component: CoachQuizEditComponent;
  let fixture: ComponentFixture<CoachQuizEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachQuizEditComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachQuizEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
