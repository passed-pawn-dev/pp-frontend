import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAddVideoComponent } from './coach-add-video.component';

describe('CoachAddVideoComponent', () => {
  let component: CoachAddVideoComponent;
  let fixture: ComponentFixture<CoachAddVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachAddVideoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachAddVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
