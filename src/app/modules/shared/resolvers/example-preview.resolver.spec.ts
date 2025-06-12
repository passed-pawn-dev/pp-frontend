import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { examplePreviewResolver } from './example-preview.resolver';

describe('examplePreviewResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => examplePreviewResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
