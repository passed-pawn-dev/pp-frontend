import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseTileComponent } from './student-course-tile.component';

describe('StudentCourseTileComponent', () => {
  let component: StudentCourseTileComponent;
  let fixture: ComponentFixture<StudentCourseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCourseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
