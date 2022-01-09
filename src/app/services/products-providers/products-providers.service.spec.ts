import {TestBed} from '@angular/core/testing';

import {ProductsProvidersService} from './products-providers.service';

describe('ProductsProvidersService', () => {
  let service: ProductsProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
