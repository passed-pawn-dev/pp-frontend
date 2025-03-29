import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBoughtCourseTileComponent } from './student-bought-course-tile.component';

describe('StudentBoughtCourseTileComponent', () => {
  let component: StudentBoughtCourseTileComponent;
  let fixture: ComponentFixture<StudentBoughtCourseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBoughtCourseTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentBoughtCourseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
