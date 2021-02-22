export class PagesSectionsModel {
  id: number;
  pageName_FK: number;
  title: string;
  description: string;
  sectionNumber: number;
  activate: boolean;
  guideItems: GuideItemsModel[];
}

export class LoanPageParametersModel {
  id: number;
  minimumLoan: number;
  maximumLoan: number;
  stepLoanChoose: number;
  maximumPaymentTime: number;
  profitRate: number;
  valueAdded: number;
  wageValue: number;
}

export class ApplyingForLoanModel {
  userId: string;
  requestedAmount: number;
  months: number;
  totalProfit: number;
  monthlyProfit: number;
  monthlyPay: number;
  totalAmount: number;
  maxPayTime: number;
}

export class ItemsOfNSCModel {
  id: number;
  name: string;
  link: string;
  itemType: number;
  icon: string;
  activate: boolean;
}

export class BrandOfNSCModel {
  id: number;
  name: string;
  link: string;
  itemType: number;
  icon: string;
  activate: boolean;
}

export class FooterMenuModel {
  id: number;
  title: string;
  link: string;
  icon: string;
  parentId: number;
  showChildes: boolean;
  activate: boolean;
}

export class StepperSectionModel {
  id: number;
  name: string;
  label: string;
  description: string;
  image: File;
  imageUrl: string;
  btnTitle: string;
  btnLink: string;
  linkType: number;
  btnLinkValue: number;
  btnLink_String: string;
  btnActivate: boolean;
  activate: boolean;
}

export class CardSectionModel {
  id: number;
  title: string;
  headerColor: string;
  tHeaderColor: string;
  bodyColor: string;
  tBodyColor: string;
  link: string;
  buttonColor: string;
  tButtonColor: string;
  activate: boolean;
}

export class SocialLinksModel {
  id: number;
  title: string;
  icon: string;
  link: string;
  color: string;
  activate: boolean;
}

export class BannerSCModel {
  id: number;
  pageName_FK: number;
  title: string;
  subTitle: string;
  backgroundUrl: string;
  textColor: string;
  activate: boolean;
}

export class BenefitSectionModel {
  id: number;
  title: string;
  description: string;
  icon: string;
  colorIcon: string;
  activate: boolean;
}

export class BenefitImageSectionModel {
  id: number;
  image: File;
  imageUrl: string;
  activate: boolean;
}

export class GuideItemsModel {
  id: number;
  imageIcon: File;
  imageIconUrl: string;
  colorText: string;
  title: string;
  description: string;
  forPage: number;
  forSection: number;
  helperPage: string;
  pageContent: string;
  activate: boolean;
}

export class RichHelpsItemModel {
  id: number;
  qAGuideItem_FK: number;
  richTexts: string;
  activate: boolean;
}

export class AskedQuestionsModel {
  id: number;
  title: string;
  description: string;
  activate: boolean;
}

export class ContactUsPageModel {
  id: number;
  title: string;
  description: string;
  tagType: number;
  activate: boolean;
}

export class UserSendMessageModel {
  id: number;
  fullName: string;
  email: string;
  message: string;
  activate: boolean;
}

export class BankFacilitieItemsModel {
  id: number;
  itemId: string;
  title: string;
  subTitle: string;
  description: string;
  price: number;
  discount: number;
  discountCode: string;
  options: string;
  imageFileOrg: File;
  imageUrlOrg: string;
  imageFileThumb: File;
  imageUrlThumb: string;
  backgroundColor: string;
  status: number;
  status_String: string;
  linkType: number;
  linkType_String: string;
  forCategory: number;
  forCategory_String: string;
  saveDate: string;
  lastUpdate: string;
  totalRequested: number;
  priority: number;
  priority_String: string;
  backLink: string;
  forMarketId: string;
  expiredDate: string;
  buttonActivate: boolean;
  activate: boolean;
}

export class BankFacilitieCategoriesModel {
  id: number;
  value: number;
  title: string;
  itemQuantity: number;
  saveDate: string;
  lastUpdate: string;
  activate: boolean;
}

export class BankFacilitiesUtilityModel {
  skip: number;
  take: number;
  category: number;
}

export class FormGeneratorPagesModel {
  id: number;
  formId: string;
  title: string;
  description: string;
  saveDate: string;
  lastUpdate: string;
  forTableName: number;
  forTableName_String: string;
  forValueOfTable: number;
  forValueOfTable_String: string;
  activate: boolean;
}

export class FormGeneratorControlsModel {
  id: number;
  title?: string;
  elementId?: string;
  elementType?: string;
  elementName?: string;
  elementValue?: string;
  formControl?: string;
  forElement?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  entity?: number;
  persianPattern: boolean;
  required: boolean;
  checked: boolean;
  forForm?: string;
  controlType: number;
  elementOrder: number;
  size: number;
  activate: boolean;
  child?: FormGeneratorControlsModel[] = new Array<FormGeneratorControlsModel>();
}

export class CategoryOfTablesModel {
  Id: number;
  Value: number;
  Title: string;
  Activate: boolean;
  Deleted: boolean;
}

export class UserBankFacilitiesModel {
  id: number;
  userId: string;
  phoneNumber: string;
  requestTC: string;
  bFItemId: string;
  bFItem_Title?: string;
  bFCategory: number;
  bFCategory_Title?: string;
  formId: string;
  formId_Title?: string;
  forFormValues: string;
  newRequest: boolean;
  saveDate: string;
  lastUpdate: string;
  confirmAdmin1: number;
  confirmAdmin2: number;
  paymentStatus: number;
  paymentStatus_String?: string;
  confirmStatus: number;
  confirmStatus_String?: string;
  activate: boolean;
  values?: UserFormValuesModel[] = new Array<UserFormValuesModel>();
  files?: File[] = new Array<File>();
}

export class UserRequestBFItemsModel {
  userId: string;
  bfItemId: string;
  formId?: string;
  values?: UserFormValuesModel[] = new Array<UserFormValuesModel>();
  files?: File[] = new Array<File>();
}

export class UserFormValuesModel {
  id: number;
  formValuesId: string;
  title: string;
  value: string;
  controlType: number;
  controlSeries: string;
  activate: boolean;
}

export class ZarinPalPGAuthorityModel {
  amount: number;
  authority: string;
  itemId: string;
  itemUId: number;
  requestTC: string;
}

export class ZarinPalResultPaymentModel {
  resultStatus: boolean;
  trackingCode: number;
}

export class ReturnZarinPalResultModel {
  requestTC: string;
  resultCode: string;
  bfRequestId: number;
}

export class NewsletterEmailsModel {
  id: number;
  userId: string;
  email: string;
  localIPAddress: string;
  isSystemUser: boolean;
  saveDate: string;
  activate: boolean;
}

export class LinksEventModel {
  sectionType: "slider" | "fetures";
  itemId: string | number;
  linkType: number;
  linkUrl: string;
}

export class LookUpTable {
  id: number;
  value: number;
  title: string;
  activated: boolean;
}

export class UserRedirectionItemsModel {
  discountCode: string;
  //userId: string;
  //tvnToken: string;
  buyDate: string;
  restApiLink: string;
}

export class RedirectToLinkModel {
  resultATC: number;
  forPayment: number;
  linkType: number;
  apiLink: string;
  discountCode: string;
}

export class RestApiLinkModel {
  buyDate: string;
  code: string;
}
