import { TestBed } from '@angular/core/testing';

import { MinisteriosService } from './ministerios.service';

describe('MinisteriosService', () => {
  let service: MinisteriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinisteriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
