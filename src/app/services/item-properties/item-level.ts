export class ItemLevel {
  token: string;
  name: string;

  constructor(token: string, name: string) {
    this.token = token;
    this.name = name;
  }

  static empty(): ItemLevel {
    return new ItemLevel('', '');
  }
}
