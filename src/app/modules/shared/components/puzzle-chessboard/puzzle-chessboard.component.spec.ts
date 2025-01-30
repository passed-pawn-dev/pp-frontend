import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleChessboardComponent } from './puzzle-chessboard.component';

describe('PuzzleChessboardComponent', () => {
  let component: PuzzleChessboardComponent;
  let fixture: ComponentFixture<PuzzleChessboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleChessboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PuzzleChessboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
