import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentVideoResolver } from './student-video.resolver';

describe('studentVideoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => studentVideoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
