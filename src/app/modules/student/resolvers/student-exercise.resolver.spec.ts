import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentExerciseResolver } from './student-exercise.resolver';

describe('studentExerciseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => studentExerciseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
