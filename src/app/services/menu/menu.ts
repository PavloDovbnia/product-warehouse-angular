import {MenuItem} from "./menu-item";

export class Menu {
  groupName: string;
  items: MenuItem[];

  constructor(groupName: string, items: MenuItem[]) {
    this.groupName = groupName;
    this.items = items;
  }
}
