import { TestBed } from '@angular/core/testing';

import { StudentLessonService } from './student-lesson.service';

describe('LessonService', () => {
  let service: StudentLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
