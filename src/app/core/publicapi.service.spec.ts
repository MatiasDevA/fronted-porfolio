import { TestBed } from '@angular/core/testing';

import { PublicapiService } from './publicapi.service';

describe('PublicapiService', () => {
  let service: PublicapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
