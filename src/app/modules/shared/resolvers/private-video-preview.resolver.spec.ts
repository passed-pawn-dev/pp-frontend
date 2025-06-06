import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { privateVideoPreviewResolver } from './private-video-preview.resolver';

describe('privateVideoPreviewResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      privateVideoPreviewResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
