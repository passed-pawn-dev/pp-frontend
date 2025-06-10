import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachEditVideoDialogComponent } from './coach-edit-video-dialog.component';

describe('CoachEditVideoDialogComponent', () => {
  let component: CoachEditVideoDialogComponent;
  let fixture: ComponentFixture<CoachEditVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachEditVideoDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachEditVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
