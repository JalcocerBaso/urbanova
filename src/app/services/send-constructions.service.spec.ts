import { TestBed } from '@angular/core/testing';

import { SendConstructionsService } from './send-constructions.service';

describe('SendConstructionsService', () => {
  let service: SendConstructionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendConstructionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
