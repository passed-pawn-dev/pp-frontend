import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentExampleResolver } from './student-example.resolver';
import { ExampleDetails } from '../models/example-details.model';

describe('studentExampleResolver', () => {
  const executeResolver: ResolveFn<ExampleDetails> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => studentExampleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
