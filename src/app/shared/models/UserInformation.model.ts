export class UserConfirmFormBuyLoanModel {
  userId: string;
  fullName: string;
  nationalCode: string;
  telephone: string;
  phoneNumber: string;
  email: string;
  shabaNumber: string;
  requestedAmount: number;
  months: number;
  address: string;
}

export class UserBuyLoanInfoModel {
  id: number;
  userId: string;
  trackingCode: string;
  dateTime: string;
  loanType: number;
  timeOfInstallmentsPayment: number;
  totalProfit: number;
  monthlyProfit: number;
  monthlyPay: number;
  result: number;
  totalPrice: number;
  endOfInstallments: number;
  expireDate: string;
  activate: boolean;
}

export class UserAlertMessagesModel {
  id: number;
  title: string;
  subTitle: string;
  sendDate: string;
  imageUrl: string;
  forUser: string;
  messageText: string;
  messageType: number;
  messageType_String: string;
  isRead: boolean;
  activate: boolean;
}

export class UsersClickedOnLinksModel {
  id?: number;
  forUserId?: string;
  forSection: number;
  forCategory?: number;
  forItemId?: string;
  clickDate?: string;
}
