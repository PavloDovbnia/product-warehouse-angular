import {TestBed} from '@angular/core/testing';

import {ProductsStockDataService} from './products-stock-data.service';

describe('ProductsStockDataService', () => {
  let service: ProductsStockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsStockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
