import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { MobilePattern, EmailPattern } from "src/app/shared/RegexPatterns";
import { HttpServices } from "src/app/shared/services/HttpServices.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  validatingForm: FormGroup;
  signInFormPanel: boolean;
  SignUpFormPanel: boolean;
  forgotPasswordPanel: boolean;

  constructor(
    private builder: FormBuilder,
    public modalRef: MDBModalRef,
    private httpService: HttpServices
  ) {
    this.signInFormPanel = true;
    this.SignUpFormPanel = false;
    this.forgotPasswordPanel = false;
  }

  i_phonenumber = new FormControl("", [Validators.required]);
  i_password = new FormControl("", [Validators.required]);
  signInForm: FormGroup = this.builder.group(
    {
      i_phonenumber: this.i_phonenumber,
      i_password: this.i_password,
    },
    {
      validator: CheckMobileOrEmailRegex("i_phonenumber"),
    }
  );

  u_phonenumber = new FormControl("", [
    Validators.required,
    Validators.pattern(MobilePattern),
  ]);
  u_password = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(50),
  ]);
  u_confirmpassword = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(50),
  ]);
  signUPForm: FormGroup = this.builder.group(
    {
      u_phonenumber: this.u_phonenumber,
      u_password: this.u_password,
      u_confirmpassword: this.u_confirmpassword,
    },
    {
      validators: [MustMatch("u_password", "u_confirmpassword")],
    }
  );

  f_phonenumber = new FormControl("", [Validators.required]);
  forgotPassForm: FormGroup = this.builder.group(
    {
      f_phonenumber: this.f_phonenumber,
    },
    {
      validators: CheckMobileOrEmailRegex("f_phonenumber"),
    }
  );

  ngOnInit(): void {}

  signIn(): void {
    // let signIn = new SignInModel();
    // signIn.phoneOrEmail = this.signInForm.value.i_phonenumber;
    // signIn.password = this.signInForm.value.i_password;

    // this.httpService.postSignInUser(signIn).subscribe((res) => {
    //   console.log(res);
    // });
  }

  signUp(): void {
    // let signUp = new SignUpModel();
    // signUp.phoneNumber = this.signUPForm.value.u_phonenumber;
    // signUp.password = this.signUPForm.value.u_password;

    // this.httpService.postSignUpUser(signUp).subscribe((res) => {
    //   console.log(res);
    // });
  }

  forgotPass(): void {
    let phoneOrEmail: string;
    phoneOrEmail = this.forgotPassForm.value.f_phonenumber;

    // this.httpService.postForgotPass(phoneOrEmail).subscribe((res) => {
    //   console.log(res);
    // });
  }

  changeRegister(): void {
    this.signInFormPanel = !this.signInFormPanel;
    this.SignUpFormPanel = !this.SignUpFormPanel;
  }

  changeForgotPass(): void {
    this.forgotPasswordPanel = !this.forgotPasswordPanel;
    if (this.forgotPasswordPanel) {
      this.signInFormPanel = false;
      this.SignUpFormPanel = false;
    }

    if (!this.forgotPasswordPanel) {
      this.signInFormPanel = false;
      this.SignUpFormPanel = true;
    }
  }
}

export function CheckMobileOrEmailRegex(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.checkMobileOrEmailRegex) {
      control.setErrors({ checkMobileOrEmailRegex: true });
      return true;
    }

    if (EmailPattern.test(control.value) || MobilePattern.test(control.value)) {
      control.setErrors(null);
      return false;
    } else {
      control.setErrors({ checkMobileOrEmailRegex: true });
      return true;
    }
  };
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return false;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return true;
    } else {
      matchingControl.setErrors(null);
      return false;
    }
  };
}
