import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachUploadImageComponent } from './coach-upload-image.component';

describe('CoachUploadImageComponent', () => {
  let component: CoachUploadImageComponent;
  let fixture: ComponentFixture<CoachUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachUploadImageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
