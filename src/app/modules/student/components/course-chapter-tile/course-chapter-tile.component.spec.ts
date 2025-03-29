import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterTileComponent } from './course-chapter-tile.component';

describe('CourseChapterTileComponent', () => {
  let component: CourseChapterTileComponent;
  let fixture: ComponentFixture<CourseChapterTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseChapterTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseChapterTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
