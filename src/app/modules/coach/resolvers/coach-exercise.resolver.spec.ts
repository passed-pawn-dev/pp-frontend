import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { coachExerciseResolver } from './coach-exercise.resolver';
import { Puzzle } from '../models/puzzle.model';

describe('coachExerciseResolver', () => {
  const executeResolver: ResolveFn<Puzzle> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => coachExerciseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
