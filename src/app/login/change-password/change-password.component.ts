import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UtilsService} from "../../services/utils/utils.service";
import {AuthService} from "../../auth/auth.service";
import {ChangePasswordInfo} from "../../auth/change-password-info";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private utilsService: UtilsService, private authService: AuthService, private tokenStorage: TokenStorageService) {
    this.form = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator: [ConfirmedValidator('newPassword', 'confirmNewPassword')]});
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let changePasswordInfo = new ChangePasswordInfo(this.form.value.currentPassword, this.form.value.newPassword);

    this.authService.changePassword(changePasswordInfo).subscribe(
      data => {
        this.utilsService.openSnackBar('Password has been changed successfully');
        this.tokenStorage.signOut();
        this.router.navigate(['auth/login']).then(() => {
        });
      },
      error => {
        this.utilsService.openSnackBar(error.message);
      }
    );
  }
}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({confirmedValidator: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}
