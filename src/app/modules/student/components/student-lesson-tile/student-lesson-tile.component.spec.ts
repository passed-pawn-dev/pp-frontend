import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLessonTileComponent } from './student-lesson-tile.component';

describe('StudentLessonTileComponent', () => {
  let component: StudentLessonTileComponent;
  let fixture: ComponentFixture<StudentLessonTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLessonTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentLessonTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
