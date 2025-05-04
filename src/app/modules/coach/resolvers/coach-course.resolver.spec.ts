import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { coachCourseResolver } from './coach-course.resolver';

describe('coachCourseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => coachCourseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
