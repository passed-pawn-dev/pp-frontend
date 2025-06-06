import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateVideoPlayerComponent } from './private-video-player.component';

describe('PrivateVideoPlayerComponent', () => {
  let component: PrivateVideoPlayerComponent;
  let fixture: ComponentFixture<PrivateVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateVideoPlayerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
