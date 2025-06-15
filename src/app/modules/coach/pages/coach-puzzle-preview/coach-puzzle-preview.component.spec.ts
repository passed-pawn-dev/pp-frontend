import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachPuzzlePreviewComponent } from './coach-puzzle-preview.component';

describe('CoachPuzzlePreviewComponent', () => {
  let component: CoachPuzzlePreviewComponent;
  let fixture: ComponentFixture<CoachPuzzlePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachPuzzlePreviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachPuzzlePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
