import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentElementTitleBarComponent } from './student-element-title-bar.component';

describe('StudentElementTitleBarComponent', () => {
  let component: StudentElementTitleBarComponent;
  let fixture: ComponentFixture<StudentElementTitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentElementTitleBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentElementTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
