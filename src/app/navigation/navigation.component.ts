import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {NavigationExtras, Router} from "@angular/router";
import {Emitters} from "../emitters/emitters";
import {MenuService} from "../services/menu/menu.service";
import {Menu} from "../services/menu/menu";
import {MenuStorageService} from "../services/menu/menu-storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    skipLocationChange: true,
  };

  username: string | undefined;
  menu: Menu[];
  isMenuOpened = false;
  isEditorOpened = false;

  constructor(private router: Router, private tokenStorage: TokenStorageService, private menuService: MenuService, private menuStorage: MenuStorageService) {
    let authorities = this.tokenStorage.getAuthorities();
    if (authorities.length > 0) {
      this.menu = menuStorage.getMenu(authorities);
    } else {
      this.menu = [];
    }
  }

  ngOnInit(): void {
    this.updateUserData();

    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        if (auth) {
          this.menuService.getMenu().subscribe(menu => {
            this.menu = this.handleRequestedMenu(menu);
          });
        }
        this.updateUserData();
      }
    );
  }

  ngLogout(): void {
    this.tokenStorage.signOut();
    this.updateUserData();
    this.router.navigate(['auth/login']).then(() => {
    });
  }

  toggleEditor(): void {
    this.isEditorOpened = !this.isEditorOpened;
  }

  private updateUserData(): void {
    this.username = this.tokenStorage.getToken() ? this.tokenStorage.getUsername() : undefined;
  }

  private handleRequestedMenu(menu: Menu[]): Menu[] {
    let authorities = this.tokenStorage.getAuthorities();
    if (authorities.length > 0) {
      this.menuStorage.saveMenu(menu, authorities);
    }
    return menu;
  }
}
