import { TestBed, inject } from '@angular/core/testing';

import { NotificationsHandlerService } from './notifications-handler.service';

describe('NotificationsHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsHandlerService]
    });
  });

  it('should be created', inject([NotificationsHandlerService], (service: NotificationsHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
