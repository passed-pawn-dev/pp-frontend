import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCourseTileComponent } from './coach-course-tile.component';

describe('CoachCourseTileComponent', () => {
  let component: CoachCourseTileComponent;
  let fixture: ComponentFixture<CoachCourseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachCourseTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachCourseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
