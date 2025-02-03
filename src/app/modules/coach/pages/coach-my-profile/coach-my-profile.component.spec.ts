import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachMyProfileComponent } from './coach-my-profile.component';

describe('CoachMyProfileComponent', () => {
  let component: CoachMyProfileComponent;
  let fixture: ComponentFixture<CoachMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachMyProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
