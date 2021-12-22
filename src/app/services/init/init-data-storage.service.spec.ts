import {TestBed} from '@angular/core/testing';

import {InitDataStorageService} from './init-data-storage.service';

describe('InitDataStorageService', () => {
  let service: InitDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
