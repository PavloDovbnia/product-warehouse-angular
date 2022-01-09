import {Product} from "../products/product";

export class ProductStockData {
  productId: bigint;
  product: Product;
  stockValue: number;

  constructor(productId: bigint, product: Product, stockValue: number) {
    this.productId = productId;
    this.product = product;
    this.stockValue = stockValue;
  }

  static empty(): ProductStockData {
    return new ProductStockData(BigInt(0), Product.empty(), 0);
  }
}
