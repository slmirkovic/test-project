import { TestBed } from '@angular/core/testing';

import { PatitentService } from './patitent.service';

describe('PatitentService', () => {
  let service: PatitentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatitentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
