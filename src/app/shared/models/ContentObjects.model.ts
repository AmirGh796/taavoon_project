import { FeturesSectionModel } from "../components/fetures-show/fetures-show.model";
import { SliderHomeModel } from "../components/slider-show/slider-show.model";
import {
  ItemsOfNSCModel,
  BrandOfNSCModel,
  StepperSectionModel,
  CardSectionModel,
  FooterMenuModel,
  SocialLinksModel,
  BannerSCModel,
  BenefitSectionModel,
  BenefitImageSectionModel,
  PagesSectionsModel,
  GuideItemsModel,
  AskedQuestionsModel,
  ContactUsPageModel,
  BankFacilitieCategoriesModel,
  FormGeneratorPagesModel,
  FormGeneratorControlsModel,
  BankFacilitieItemsModel,
  UserFormValuesModel,
  LoanPageParametersModel,
} from "./MainSite.model";

export class GetNavigationBarModel {
  items: ItemsOfNSCModel[];
  brand: BrandOfNSCModel;
}

export class GetFooterItemsModel {
  footerItems: FooterMenuModel[];
  allSocials: SocialLinksModel[];
}

export class GetHomePageItemsModel {
  slides: SliderHomeModel[];
  slidesActivate: boolean;
  feturesTitle: string;
  feturesDescription: string;
  fetures: FeturesSectionModel[];
  feturesActivate: boolean;
  bankFacilitiesTitle: string;
  bankFacilitiesDescription: string;
  bankFacilitiesItems: BankFacilitieItemsModel[];
  bankFacilitiesActivate: boolean;
  commentsTitle: string;
  commentsDescription: string;
  commentsActivate: boolean;
  cardsTitle: string;
  cardsDescription: string;
  cards: CardSectionModel[];
  cardsActivate: boolean;
  countersTitle: string;
  countersDescription: string;
  countersActivate: boolean;
}

export class GetLoanPageItemsModel {
  banner: BannerSCModel;
  benefitTitle: string;
  benefitDescription: string;
  benefits: BenefitSectionModel[];
  benefitImage: BenefitImageSectionModel;
  benefitActivate: boolean;
  stepsTitle: string;
  stepsDescription: string;
  steps: StepperSectionModel[];
  stepsActivate: boolean;
  loanParameters: LoanPageParametersModel;
}

export class GetQuestionsGuideItemsModel {
  banner: BannerSCModel;
  sections: PagesSectionsModel[];
  itemsSection: GuideItemsModel[];
  qaItems: AskedQuestionsModel[];
}

export class GetBankFacilitiesPageItemsModel {
  banner: BannerSCModel;
  bfCategories: BankFacilitieCategoriesModel[];
}

export class GetContactUsPageItemsModel {
  banner: BannerSCModel;
  contactUsItems: ContactUsPageModel[];
}

export class GetFormPageModel {
  facilitieItem: BankFacilitieItemsModel;
  facilitieCategory: BankFacilitieCategoriesModel;
  page: FormGeneratorPagesModel;
  controls: FormGeneratorControlsModel[];
}

export class SendFormValuesAndFilesModel {
  formValues: UserFormValuesModel[];
  files: File[];
}

export class AboutUsPageModel {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  imageFile: File;
  imageUrl: string;
  activate: boolean;
  socialLinks: SocialLinksModel[];
}
