import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachExampleEditComponent } from './coach-example-edit.component';

describe('CoachExampleEditComponent', () => {
  let component: CoachExampleEditComponent;
  let fixture: ComponentFixture<CoachExampleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachExampleEditComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachExampleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
