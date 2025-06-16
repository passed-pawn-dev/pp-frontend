import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentPuzzleResolver } from './student-puzzle.resolver';
import { Puzzle } from '../../shared/models/puzzle.model';

describe('studentPuzzleResolver', () => {
  const executeResolver: ResolveFn<Puzzle> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => studentPuzzleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
