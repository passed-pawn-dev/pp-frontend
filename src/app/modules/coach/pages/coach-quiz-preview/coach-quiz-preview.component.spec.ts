import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachQuizPreviewComponent } from './coach-quiz-preview.component';

describe('CoachQuizPreviewComponent', () => {
  let component: CoachQuizPreviewComponent;
  let fixture: ComponentFixture<CoachQuizPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachQuizPreviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachQuizPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
