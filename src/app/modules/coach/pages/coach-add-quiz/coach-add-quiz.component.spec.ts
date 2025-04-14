import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAddQuizComponent } from './coach-add-quiz.component';

describe('CoachAddQuizComponent', () => {
  let component: CoachAddQuizComponent;
  let fixture: ComponentFixture<CoachAddQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachAddQuizComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachAddQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
