import { TestBed, inject } from '@angular/core/testing';

import { AuthServiceChatService } from './auth-service-chat.service';

describe('AuthServiceChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServiceChatService]
    });
  });

  it('should be created', inject([AuthServiceChatService], (service: AuthServiceChatService) => {
    expect(service).toBeTruthy();
  }));
});
