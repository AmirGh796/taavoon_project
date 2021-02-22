export class SignUpModel {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  userOSInfo: string;
}

export class SignInModel {
  id: number;
  userName: string;
  password: string;
}

export class ForgotPasswordModel {
  phoneNumber: string;
  email: string;
}
