import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExampleComponent } from './student-example.component';

describe('StudentExampleComponent', () => {
  let component: StudentExampleComponent;
  let fixture: ComponentFixture<StudentExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
