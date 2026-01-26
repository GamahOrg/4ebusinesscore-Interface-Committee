import { SignInMode, ThemMode } from "./platform-enums";

export type MainSettingHeadersValues = {
  id: string;
  nameAr: string;
  nameEn: string;
  url: string;
  workspaceKey: number;
  isDropdown: boolean;
  isHide: boolean;
};
export type mainSettingLoginsValues = {
  id: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  imageFile: string;
  fileName: string;
  subSystemId: string | null;
};

export class PlatformModel {
  id?: string;
  webLogo?: string;
  webLogoDarkMode?: string;
  temporaryWebCover?: string;
  webCover?: string;
  webCoverDarkMode?: string;
  temporaryWebCoverDarkMode?: string;
  webTitle?: string;
  webUrl?: string;
  webDescription?: string;
  startDate?: Date;
  endDate?: Date;
  headerCover?: string;
  headerCoverDarkMode?: string;
  iconTitle?: string;
  isThem?: boolean;
  logoWebCoverLogin?: string;
  mainSettingsSites?: [];
  themName?: string;
  footerDescriptionAr?: string;
  footerDescriptionEn?: string;
  footerLogo?: string;
  footerLogoDarkMode?: string;
  attachmentStyle?: string;
  webCoverLogin?: string;
  mainSettingHeaders?: MainSettingHeadersValues[];
  deurationSppinner?: number;
  isSignInDynamic?: boolean;
  mainSettingLogins: mainSettingLoginsValues[];
  logoSystemLogin: string;
  signInMode: number;
  themMode: any;
  chatBotIsVisible: any;
  constructor(
    id: string = "",
    webLogo: string = "",
    webLogoDarkMode: string = "",
    temporaryWebCover: string = "",
    webCover: string = "",
    webCoverDarkMode: string = "",
    temporaryWebCoverDarkMode: string = "",
    webTitle: string = "",
    webUrl: string = "",
    webDescription: string = "",
    startDate: Date = new Date(),
    endDate: Date = new Date(),
    headerCover: string = "",
    headerCoverDarkMode: string = "",
    iconTitle: string = "",
    footerDescriptionAr: string = "",
    footerDescriptionEn: string = "",
    footerLogo: string = "",
    footerLogoDarkMode: string = "",
    webCoverLogin: string = "",
    mainSettingHeaders: MainSettingHeadersValues[] = [],
    isSignInDynamic: boolean = true,
    deurationSppinner: number = 0,
    mainSettingLogins: mainSettingLoginsValues[] = [],
    logoSystemLogin: string = "",
    themMode: any = ThemMode.Development,
    signInMode: any = SignInMode.Dynamic,
    chatBotIsVisible: any = ""
  ) {
    this.webLogo = webLogo;
    this.webLogoDarkMode = webLogoDarkMode;
    this.temporaryWebCover = temporaryWebCover;
    this.webCover = webCover;
    this.webCoverDarkMode = webCoverDarkMode;
    this.temporaryWebCoverDarkMode = temporaryWebCoverDarkMode;
    this.webUrl = webUrl;
    this.webDescription = webDescription;
    this.startDate = startDate;
    this.endDate = endDate;
    this.webTitle = webTitle;
    this.id = id;
    this.headerCover = headerCover;
    this.headerCoverDarkMode = headerCoverDarkMode;
    this.iconTitle = iconTitle;
    this.footerDescriptionAr = footerDescriptionAr;
    this.footerDescriptionEn = footerDescriptionEn;
    this.footerLogo = footerLogo;
    this.footerLogoDarkMode = footerLogoDarkMode;
    this.webCoverLogin = webCoverLogin;
    this.mainSettingHeaders = mainSettingHeaders;
    this.isSignInDynamic = isSignInDynamic;
    this.deurationSppinner = deurationSppinner;
    this.mainSettingLogins = mainSettingLogins;
    this.logoSystemLogin = logoSystemLogin;
    this.signInMode = signInMode;
    this.themMode = themMode;
    this.chatBotIsVisible = chatBotIsVisible;
  }
}
