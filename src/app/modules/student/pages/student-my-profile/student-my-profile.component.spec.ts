import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyProfileComponent } from './student-my-profile.component';

describe('StudentMyProfileComponent', () => {
  let component: StudentMyProfileComponent;
  let fixture: ComponentFixture<StudentMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMyProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
