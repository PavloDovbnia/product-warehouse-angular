export class ItemPropertyValue {
  value: string

  constructor(value: string) {
    this.value = value;
  }

  static empty(): ItemPropertyValue {
    return new ItemPropertyValue('');
  }
}
