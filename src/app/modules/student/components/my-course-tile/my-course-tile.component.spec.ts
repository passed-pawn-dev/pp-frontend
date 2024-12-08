import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseTileComponent } from './my-course-tile.component';

describe('CourseTileComponent', () => {
  let component: MyCourseTileComponent;
  let fixture: ComponentFixture<MyCourseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCourseTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCourseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
