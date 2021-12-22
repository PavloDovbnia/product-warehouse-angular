import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UtilsService} from "../../services/utils/utils.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private utilsService: UtilsService) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator: [ConfirmedValidator('password', 'confirmPassword')]});
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.utilsService.openSnackBar('Password has been reset');
    this.router.navigate(['auth-login']).then(() => {
    });
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
