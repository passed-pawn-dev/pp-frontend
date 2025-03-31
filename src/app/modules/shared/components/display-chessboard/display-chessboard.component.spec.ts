import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayChessboardComponent } from './display-chessboard.component';

describe('DisplayChessboardComponent', () => {
  let component: DisplayChessboardComponent;
  let fixture: ComponentFixture<DisplayChessboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayChessboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayChessboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
