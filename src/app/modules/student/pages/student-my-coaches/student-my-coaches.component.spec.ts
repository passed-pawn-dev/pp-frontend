import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyCoachesComponent } from './student-my-coaches.component';

describe('StudentMyCoachesComponent', () => {
  let component: StudentMyCoachesComponent;
  let fixture: ComponentFixture<StudentMyCoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMyCoachesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMyCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
