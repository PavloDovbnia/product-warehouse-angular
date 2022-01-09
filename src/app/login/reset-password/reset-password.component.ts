import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../services/utils/utils.service";
import {SaveNewPasswordInfo} from "../../auth/save-new-password-info";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  token?: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private utilsService: UtilsService, private authService: AuthService) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator: [ConfirmedValidator('password', 'confirmPassword')]});
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit(): void {
    if (this.token) {
      let saveNewPasswordInfo = new SaveNewPasswordInfo(this.token, this.form.value.password);

      this.authService.savePassword(saveNewPasswordInfo).subscribe(
        data => {
          this.utilsService.openSnackBar('Password has been saved successfully');
          this.router.navigate(['auth-login']).then(() => {
          });
        },
        error => {
          this.utilsService.openSnackBar(error.message);
        }
      );
    } else {
      this.utilsService.openSnackBar('password reset token is not provided')
    }
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
