import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSideListComponent } from './lesson-side-list.component';

describe('LessonSideListComponent', () => {
  let component: LessonSideListComponent;
  let fixture: ComponentFixture<LessonSideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonSideListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonSideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
