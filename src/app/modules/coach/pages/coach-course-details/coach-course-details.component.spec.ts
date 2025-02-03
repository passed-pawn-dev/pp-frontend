import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCourseDetailsComponent } from './coach-course-details.component';

describe('CoachCourseDetailsComponent', () => {
  let component: CoachCourseDetailsComponent;
  let fixture: ComponentFixture<CoachCourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachCourseDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
