import { TestBed, inject } from '@angular/core/testing';

import { TripHandlerService } from './trip-handler.service';

describe('TripHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripHandlerService]
    });
  });

  it('should be created', inject([TripHandlerService], (service: TripHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
