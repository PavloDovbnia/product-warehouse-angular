import {MenuItem} from "./menu-item";

export class Menu {
  groupName: string;
  outletLink: string;
  items: MenuItem[];

  constructor(groupName: string, outletLink: string, items: MenuItem[]) {
    this.groupName = groupName;
    this.outletLink = outletLink;
    this.items = items;
  }
}
