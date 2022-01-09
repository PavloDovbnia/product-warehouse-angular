import {ItemPropertyValue} from "./item-property-value";

export class ItemPropertiesHolder {
  properties: Record<string, ItemPropertyValue>;

  constructor(properties: Record<string, ItemPropertyValue>) {
    this.properties = properties;
  }

  static empty(): ItemPropertiesHolder {
    return new ItemPropertiesHolder({});
  }

  static fromJson(json: {
    properties: {}
  }): ItemPropertiesHolder {
    return new ItemPropertiesHolder(json.properties);
  }
}
