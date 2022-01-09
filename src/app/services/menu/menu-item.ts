export class MenuItem {
  name: string;
  outletLink: string;
  accessType: string;

  constructor(name: string, outletLink: string, accessType: string) {
    this.name = name;
    this.outletLink = outletLink;
    this.accessType = accessType;
  }
}
