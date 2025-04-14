import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentQuizResolver } from './student-quiz.resolver';

describe('studentQuizResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => studentQuizResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
