import { TestBed } from '@angular/core/testing';

import { AiChatService } from './ai-chat.service';

describe('AiChatServiceService', () => {
  let service: AiChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
