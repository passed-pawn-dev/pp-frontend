import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentBoughtCourseResolver } from './student-bought-course.resolver';

describe('studentBoughtCourseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
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
