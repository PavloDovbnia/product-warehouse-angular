import {Role} from "./role";

export class User {
  id: bigint;
  username: string;
  email: string;
  roles: Array<Role>;

  constructor(id: bigint, username: string, email: string, roles: Array<Role>) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  static empty(): User {
    return new User(BigInt(0), '', '', new Array<Role>());
  }

  static fromJson(json: {
    id: bigint;
    username: string;
    email: string;
    roles: [];
  }): User {
    return new User(json.id, json.username, json.email, json.roles.map(role => Role.fromJson(role)));
  }
}
