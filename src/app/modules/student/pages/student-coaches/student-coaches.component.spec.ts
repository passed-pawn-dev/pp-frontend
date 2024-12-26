import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoachesComponent } from './student-coaches.component';

describe('StudentCoachesComponent', () => {
  let component: StudentCoachesComponent;
  let fixture: ComponentFixture<StudentCoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCoachesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
