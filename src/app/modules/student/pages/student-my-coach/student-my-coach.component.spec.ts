import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyCoachComponent } from './student-my-coach.component';

describe('StudentMyCoachComponent', () => {
  let component: StudentMyCoachComponent;
  let fixture: ComponentFixture<StudentMyCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMyCoachComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMyCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
