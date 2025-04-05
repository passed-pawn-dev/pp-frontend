import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsDiagramComponent } from './course-details-diagram.component';

describe('CourseDetailsDiagramComponent', () => {
  let component: CourseDetailsDiagramComponent;
  let fixture: ComponentFixture<CourseDetailsDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailsDiagramComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailsDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
