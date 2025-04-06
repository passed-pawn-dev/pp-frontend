import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAddQuizComponentComponent } from './coach-add-quiz-component.component';

describe('CoachAddQuizComponentComponent', () => {
  let component: CoachAddQuizComponentComponent;
  let fixture: ComponentFixture<CoachAddQuizComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachAddQuizComponentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachAddQuizComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
