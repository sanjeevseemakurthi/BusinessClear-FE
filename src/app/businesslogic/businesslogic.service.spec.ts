import { TestBed } from '@angular/core/testing';

import { BusinesslogicService } from './businesslogic.service';

describe('BusinesslogicService', () => {
  let service: BusinesslogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinesslogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
