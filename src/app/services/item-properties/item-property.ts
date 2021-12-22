export class ItemProperty {
  id: bigint;
  token: string;
  name: string;
  type: string;
  dataType: string;
  itemLevel: string;

  constructor(id: bigint, token: string, name: string, type: string, dataType: string, itemLevel: string) {
    this.id = id;
    this.token = token;
    this.name = name;
    this.type = type;
    this.dataType = dataType;
    this.itemLevel = itemLevel;
  }

  static empty(): ItemProperty {
    return new ItemProperty(BigInt(0), '', '', '', '', '');
  }
}
