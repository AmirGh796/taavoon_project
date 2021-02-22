export class SliderShowModel {
  isControls: boolean;
  interval: number;
  animation: string;
  slides?: SliderHomeModel[];
}

export class SliderHomeModel {
  id: number;
  title: string;
  description: string;
  showLine: boolean;
  textColor: number;
  backgroundImage: File;
  backgroundUrl: string;
  activate: boolean;
  showChildes: boolean;
  buttons: SliderButtonHomeModel[];
}

export class SliderButtonHomeModel {
  id: number;
  contentHomeSlider_Id: number;
  title: string;
  backgroundColor: number;
  buttonType: number;
  linkType: number;
  link: string;
  activate: boolean;
}
