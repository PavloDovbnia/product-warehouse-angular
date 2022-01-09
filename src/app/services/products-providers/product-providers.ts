import {Product} from "../products/product";
import {ProductProvider} from "./product-provider";

export class ProductProviders {
  productId: bigint;
  product: Product;
  providers: Array<ProductProvider>;
  providersIds?: Array<bigint>;

  constructor(product: Product, providers: Array<ProductProvider>) {
    this.productId = product.id;
    this.product = product;
    this.providers = providers;
    this.providersIds = providers.map(provider => provider.providerId);
  }

  static empty(): ProductProviders {
    return new ProductProviders(Product.empty(), new Array<ProductProvider>());
  }
}
