import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDifficultyComponent } from './course-difficulty.component';

describe('CourseDifficultyComponent', () => {
  let component: CourseDifficultyComponent;
  let fixture: ComponentFixture<CourseDifficultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDifficultyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
