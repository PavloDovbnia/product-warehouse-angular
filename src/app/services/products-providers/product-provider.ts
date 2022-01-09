import {User} from "../users/user";
import {Product} from "../products/product";

export class ProductProvider {
  providerId: bigint;
  provider: User;
  productsIds: Array<bigint>;
  products: Array<Product>;

  constructor(providerId: bigint, provider: User, productsIds: Array<bigint>, products: Array<Product>) {
    this.providerId = providerId;
    this.provider = provider;
    this.productsIds = productsIds;
    this.products = products;
  }

  static empty(): ProductProvider {
    return new ProductProvider(BigInt(0), User.empty(), new Array<bigint>(), new Array<Product>());
  }

  static fromJson(json: {
    providerId: bigint;
    provider: User;
    productsIds: [];
    products: [];
  }): ProductProvider {
    return new ProductProvider(json.providerId, json.provider, json.productsIds, json.products);
  }
}
