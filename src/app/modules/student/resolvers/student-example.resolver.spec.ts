import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentExampleResolver } from './student-example.resolver';

describe('studentExampleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => studentExampleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
