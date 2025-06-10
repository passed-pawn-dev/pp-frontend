import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachVideoPreviewComponent } from './coach-video-preview.component';

describe('CoachVideoPreviewComponent', () => {
  let component: CoachVideoPreviewComponent;
  let fixture: ComponentFixture<CoachVideoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachVideoPreviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachVideoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
