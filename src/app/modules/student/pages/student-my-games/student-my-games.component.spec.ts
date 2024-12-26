import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyGamesComponent } from './student-my-games.component';

describe('MyGamesComponent', () => {
  let component: StudentMyGamesComponent;
  let fixture: ComponentFixture<StudentMyGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMyGamesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMyGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
