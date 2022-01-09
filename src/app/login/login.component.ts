import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/login-info';
import {Router} from "@angular/router";
import {Emitters} from "../emitters/emitters";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilsService} from "../services/utils/utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo | undefined;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private utilsService: UtilsService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.router.navigate(['']).then(() => {
      });
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.value.username,
      this.form.value.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveTokenType(data.type);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        Emitters.authEmitter.emit(true);
        this.router.navigate(['']).then(() => {
        });
      },
      error => {
        this.utilsService.openSnackBar(error.message);
        this.errorMessage = error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
