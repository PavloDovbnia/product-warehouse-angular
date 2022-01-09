import {Category} from "../categories/category";
import {ItemPropertiesHolder} from "../item-properties/ItemPropertiesHolder";
import {Product} from "../products/product";

export class ProductGroup {
  id: bigint;
  name: string;
  category: Category;
  properties: ItemPropertiesHolder;
  products: Array<Product>;

  constructor(id: bigint, name: string, category: Category, properties: ItemPropertiesHolder, products: Array<Product>) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.properties = properties;
    this.products = products;
  }

  static empty(): ProductGroup {
    return new ProductGroup(BigInt(0), '', Category.empty(), ItemPropertiesHolder.empty(), new Array<Product>());
  }
}
