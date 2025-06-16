import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { puzzlePreviewResolver } from './puzzle-preview.resolver';
import { Puzzle } from '../models/puzzle.model';

describe('puzzlePreviewResolver', () => {
  const executeResolver: ResolveFn<Puzzle> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => puzzlePreviewResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
