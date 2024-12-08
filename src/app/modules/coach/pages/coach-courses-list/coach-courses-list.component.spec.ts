import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCoursesListComponent } from './coach-courses-list.component';

describe('CoachCoursesListComponent', () => {
  let component: CoachCoursesListComponent;
  let fixture: ComponentFixture<CoachCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachCoursesListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
