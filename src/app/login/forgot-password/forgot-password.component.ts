import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {ResetPasswordInfo} from "../../auth/reset-password-info";
import {UtilsService} from "../../services/utils/utils.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private utilsService: UtilsService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let resetPasswordInfo = new ResetPasswordInfo(this.form.value.email);

    this.authService.resetPassword(resetPasswordInfo).subscribe(
      data => {
        this.utilsService.openSnackBar(data);
      },
      error => {
        this.utilsService.openSnackBar(error.message);
      }
    );
  }

}
