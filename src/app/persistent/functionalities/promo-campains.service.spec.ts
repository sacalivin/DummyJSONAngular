import { TestBed } from '@angular/core/testing';

import { PromoCampainsService } from './promo-campains.service';

describe('PromoCampainsService', () => {
  let service: PromoCampainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoCampainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
