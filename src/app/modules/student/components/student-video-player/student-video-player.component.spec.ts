import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVideoPlayerComponent } from './student-video-player.component';

describe('StudentVideoPlayerComponent', () => {
  let component: StudentVideoPlayerComponent;
  let fixture: ComponentFixture<StudentVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentVideoPlayerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
