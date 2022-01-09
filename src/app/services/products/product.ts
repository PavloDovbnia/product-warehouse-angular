import {ProductGroup} from "../product-groups/product-group";
import {ItemPropertiesHolder} from "../item-properties/ItemPropertiesHolder";

export class Product {
  id: bigint;
  name: string;
  productGroup: ProductGroup;
  properties: ItemPropertiesHolder;

  constructor(id: bigint, name: string, productGroup: ProductGroup, properties: ItemPropertiesHolder) {
    this.id = id;
    this.name = name;
    this.productGroup = productGroup;
    this.properties = properties;
  }

  static empty(): Product {
    return new Product(BigInt(0), '', ProductGroup.empty(), ItemPropertiesHolder.empty());
  }
}
