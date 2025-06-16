import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachPuzzleEditComponent } from './coach-puzzle-edit.component';

describe('CoachPuzzleEditComponent', () => {
  let component: CoachPuzzleEditComponent;
  let fixture: ComponentFixture<CoachPuzzleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachPuzzleEditComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachPuzzleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
