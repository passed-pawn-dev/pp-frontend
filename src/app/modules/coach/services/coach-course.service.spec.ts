import { TestBed } from '@angular/core/testing';

import { CoachCourseService } from './coach-course.service';

describe('CoachCourseService', () => {
  let service: CoachCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
