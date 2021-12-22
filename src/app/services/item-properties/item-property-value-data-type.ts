export class ItemPropertyValueDataType {
  token: string;
  name: string;

  constructor(token: string, name: string) {
    this.token = token;
    this.name = name;
  }

  static empty(): ItemPropertyValueDataType {
    return new ItemPropertyValueDataType('', '');
  }
}
