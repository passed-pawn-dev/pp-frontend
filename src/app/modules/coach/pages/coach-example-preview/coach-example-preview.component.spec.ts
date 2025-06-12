import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachExamplePreviewComponent } from './coach-example-preview.component';

describe('CoachExamplePreviewComponent', () => {
  let component: CoachExamplePreviewComponent;
  let fixture: ComponentFixture<CoachExamplePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachExamplePreviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachExamplePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
