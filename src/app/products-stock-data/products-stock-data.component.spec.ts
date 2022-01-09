import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsStockDataComponent} from './products-stock-data.component';

describe('ProductsStockDataComponent', () => {
  let component: ProductsStockDataComponent;
  let fixture: ComponentFixture<ProductsStockDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsStockDataComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsStockDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
