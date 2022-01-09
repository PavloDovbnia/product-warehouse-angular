export class Category {
  id: bigint;
  name: string;

  constructor(id: bigint, name: string) {
    this.id = id;
    this.name = name;
  }

  static empty(): Category {
    return new Category(BigInt(0), '');
  }
}
