import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPuzzleChessboardComponent } from './student-puzzle-chessboard.component';

describe('StudentPuzzleChessboardComponent', () => {
  let component: StudentPuzzleChessboardComponent;
  let fixture: ComponentFixture<StudentPuzzleChessboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPuzzleChessboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentPuzzleChessboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
