import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavigationComponent} from "../../navigation/navigation.component";
import {Router} from "@angular/router";
import {UtilsService} from "../../services/utils/utils.service";
import {UsersService} from "../../services/users/users.service";
import {User} from "../../services/users/user";
import {Role} from "../../services/users/role";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  user?: User;
  roles = new Array<string>();
  userRoles?: Array<string>;
  authenticatedUsername?: string;

  constructor(private formBuilder: FormBuilder, private navigation: NavigationComponent, private router: Router,
              private utilsService: UtilsService, private usersService: UsersService, private tokenStorage: TokenStorageService) {
    this.form = this.initForm();
  }

  ngOnInit(): void {
    this.authenticatedUsername = this.tokenStorage.getUsername();
    this.usersService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
    this.usersService.sharingUser.subscribe(user => {
      this.user = {...user};
      this.userRoles = new Array<string>();
      this.user?.roles.forEach(role => {
        this.userRoles?.push(role.type);
      });
      this.form = this.initForm();
    });
  }

  onSubmit(): void {
    if (this.user) {

      const roles = new Array<Role>();
      this.form.value.roles.forEach((role: string) => {
        roles.push(new Role(role));
      });

      const user: User = {
        id: this.user.id,
        username: this.form.value.username ? this.form.value.username : this.authenticatedUsername,
        email: this.form.value.email,
        roles: roles,
      };
      this.usersService.saveUser(user).subscribe(users => {
          this.usersService.shareUsers(users);
          this.utilsService.openSnackBar(user.username + ' user is saved');
        },
        error => this.utilsService.openSnackBar(error.message));
      this.navigateToUsers();
    } else {
      this.utilsService.openSnackBar('User is empty');
    }
  }

  onCancel(): void {
    this.navigateToUsers();
  }

  private navigateToUsers(): void {
    this.user = undefined;
    this.navigation.toggleEditor();
    this.router.navigate(['', {outlets: {editor: null}}]).then(() => {
    });
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      username: new FormControl({
        value: this.user,
        disabled: this.authenticatedUsername === this.user?.username
      }, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      roles: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }
}
