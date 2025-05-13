import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAddExampleComponent } from './coach-add-example.component';

describe('CoachAddExampleComponent', () => {
  let component: CoachAddExampleComponent;
  let fixture: ComponentFixture<CoachAddExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachAddExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachAddExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
