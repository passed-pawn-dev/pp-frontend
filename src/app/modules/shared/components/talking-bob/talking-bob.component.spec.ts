import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkingBobComponent } from './talking-bob.component';

describe('TalkingBobComponent', () => {
  let component: TalkingBobComponent;
  let fixture: ComponentFixture<TalkingBobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalkingBobComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TalkingBobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
