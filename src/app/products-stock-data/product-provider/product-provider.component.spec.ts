import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductProviderComponent} from './product-provider.component';

describe('ProductProviderComponent', () => {
  let component: ProductProviderComponent;
  let fixture: ComponentFixture<ProductProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductProviderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
