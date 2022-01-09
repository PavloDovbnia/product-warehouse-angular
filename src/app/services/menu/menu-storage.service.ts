import {Injectable} from '@angular/core';
import {Menu} from "./menu";

const MENU_KEY = 'UserMenu';

@Injectable({
  providedIn: 'root'
})
export class MenuStorageService {

  private menu: Array<Menu> = [];

  constructor() {
  }

  public saveMenu(menu: Menu[], authorities: string[]) {
    let key = MenuStorageService.getKey(authorities);
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, JSON.stringify(menu));
  }

  public getMenu(authorities: string[]): Menu[] {
    let key = MenuStorageService.getKey(authorities);
    if (window.sessionStorage.getItem(key)) {
      this.menu = JSON.parse(<string>window.sessionStorage.getItem(key));
    }
    return this.menu;
  }

  private static getKey(authorities: string[]): string {
    return MENU_KEY + JSON.stringify(authorities);
  }
}
