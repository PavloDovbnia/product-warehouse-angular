export class Role {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  static fromJson(json: {
    type: string;
  }): Role {
    return new Role(json.type);
  }
}
