import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachLessonComponent } from './coach-lesson.component';

describe('CoachLessonComponent', () => {
  let component: CoachLessonComponent;
  let fixture: ComponentFixture<CoachLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachLessonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
