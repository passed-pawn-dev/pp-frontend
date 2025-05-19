import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAddCourseThumbnailComponent } from './coach-add-course-thumbnail.component';

describe('CoachAddCourseThumbnailComponent', () => {
  let component: CoachAddCourseThumbnailComponent;
  let fixture: ComponentFixture<CoachAddCourseThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachAddCourseThumbnailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachAddCourseThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
