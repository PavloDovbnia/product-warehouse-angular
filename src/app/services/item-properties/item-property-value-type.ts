export class ItemPropertyValueType {
  token: string;
  name: string;

  constructor(token: string, name: string) {
    this.token = token;
    this.name = name;
  }

  static empty(): ItemPropertyValueType {
    return new ItemPropertyValueType('', '');
  }
}
