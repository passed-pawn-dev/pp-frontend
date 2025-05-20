import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentBoughtCourseResolver } from './student-bought-course.resolver';
import { MyCourseDetails } from '../models/MyCourseDetails';

describe('studentBoughtCourseResolver', () => {
  const executeResolver: ResolveFn<MyCourseDetails> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      studentBoughtCourseResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
