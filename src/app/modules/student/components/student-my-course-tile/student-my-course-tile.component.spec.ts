import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyCourseTileComponent } from './student-my-course-tile.component';

describe('StudentMyCourseTileComponent', () => {
  let component: StudentMyCourseTileComponent;
  let fixture: ComponentFixture<StudentMyCourseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMyCourseTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMyCourseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
