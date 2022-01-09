import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../services/users/users.service";
import {User} from "../services/users/user";
import {UtilsService} from "../services/utils/utils.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users = new Array<User>();
  authenticatedUsername?: string;

  constructor(private usersService: UsersService, private utilsService: UtilsService, private router: Router, private navigation: NavigationComponent, private tokenStorage: TokenStorageService) {
  }

  displayedColumns: string[] = ['username', 'email', 'roles', 'actions'];
  dataSource = new MatTableDataSource(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit(): void {
    this.decorateDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.authenticatedUsername = this.tokenStorage.getUsername();
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource.data = this.users;
    }, error => {
      this.utilsService.openSnackBar(error.message);
    })

    this.usersService.sharingUsers.subscribe(users => {
      this.users = users;
      this.dataSource.data = users;
    });
  }

  editUser(user: User): void {
    this.usersService.shareUser(user);
    this.router.navigate(['', {outlets: {editor: ['users', 'user', user.id]}}]).then(() => {
    });
    this.navigation.toggleEditor();
  }

  deleteUser(user: User): void {
    this.usersService.deleteUser(user).subscribe(users => {
      this.users = users;
      this.dataSource.data = this.users;
    });
    this.utilsService.openSnackBar(user.username + ' user is deleted');
  }

  createUser() {
    this.usersService.shareUser(User.empty());
    this.router.navigate(['', {outlets: {editor: ['users', 'user', 'new']},}], {skipLocationChange: true}).then(() => {
    });
    this.navigation.toggleEditor();
  }

  private decorateDataSource(): void {
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    this.dataSource.sort = this.sort ? this.sort : null;
  }

}
