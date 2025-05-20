import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentCourseResolver } from './student-course.resolver';
import { CourseDetails } from '../models/CourseDetails';

describe('studentCourseResolver', () => {
  const executeResolver: ResolveFn<CourseDetails> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => studentCourseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
