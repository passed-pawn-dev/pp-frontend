import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleChessboardCopyComponent } from './puzzle-chessboard-copy.component';

describe('PuzzleChessboardCopyComponent', () => {
  let component: PuzzleChessboardCopyComponent;
  let fixture: ComponentFixture<PuzzleChessboardCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleChessboardCopyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PuzzleChessboardCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
