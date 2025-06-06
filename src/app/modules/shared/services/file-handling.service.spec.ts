import { TestBed } from '@angular/core/testing';

import { FileHandlingService } from './file-handling.service';

describe('FileHandlingService', () => {
  let service: FileHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
