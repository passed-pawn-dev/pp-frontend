import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachLessonFormComponent } from './coach-lesson-form.component';

describe('CoachLessonFormComponent', () => {
  let component: CoachLessonFormComponent;
  let fixture: ComponentFixture<CoachLessonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachLessonFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachLessonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
