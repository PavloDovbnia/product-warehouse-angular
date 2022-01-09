import {ItemPropertiesHolder} from "../item-properties/ItemPropertiesHolder";
import {ProductGroup} from "../product-groups/product-group";

export class Manufacturer {
  id: bigint;
  name: string;
  properties: ItemPropertiesHolder;
  productGroups: Array<ProductGroup>;

  constructor(id: bigint, name: string, properties: ItemPropertiesHolder, productGroups: Array<ProductGroup>) {
    this.id = id;
    this.name = name;
    this.properties = properties;
    this.productGroups = productGroups;
  }

  static empty(): Manufacturer {
    return new Manufacturer(BigInt(0), '', ItemPropertiesHolder.empty(), new Array<ProductGroup>());
  }

  static fromJson(json: {
    id: bigint,
    name: string,
    properties: {
      properties: {}
    },
    productGroups: []
  }): Manufacturer {
    return new Manufacturer(json.id, json.name, ItemPropertiesHolder.fromJson(json.properties), json.productGroups);
  }
}
