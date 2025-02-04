import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCourseFormComponent } from './coach-course-form.component';

describe('CoachCourseFormComponent', () => {
  let component: CoachCourseFormComponent;
  let fixture: ComponentFixture<CoachCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachCourseFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
