class SystemClassification {
  subSystemId: string;
  color: number;
  description: string;
  icon: string;
  nameAr: string;
  nameEn: string;
  isSubSystem: boolean;
  mainNameAr: string;
  mainNameEn: string;
  havePermession: boolean;
  isExternal: boolean;
  isExternalComponent: boolean;
  isSinglSignOn: boolean;
  identityProvider: string | null;
  clientId: string | null;
  clientSecret: string | null;
  url: string;
  squence: number;
  subsytemMainLookupId: string;
  subsytemMainLookupNameAr: string;
  subsytemMainLookupNameEn: string;
  isComponent: boolean;
  workspaceKey: number;
  parentId: string;
  mainClassificationId?: any;

  constructor(
    subSystemId: string = "",
    color: number = 0,
    description: string = "",
    icon: string = "",
    nameAr: string = "",
    nameEn: string = "",
    isSubSystem: boolean = false,
    mainNameAr: string = "",
    mainNameEn: string = "",
    havePermession: boolean = false,
    isExternal: boolean = false,
    isExternalComponent: boolean = false,
    isSinglSignOn: boolean = false,
    identityProvider: null | string = "",
    clientId: null | string = "",
    clientSecret: null | string = "",
    url: string = "",
    squence: number = 0,
    subsytemMainLookupId: string = "",
    subsytemMainLookupNameAr: string = "",
    subsytemMainLookupNameEn: string = "",
    isComponent: boolean = false,
    workspaceKey: number = 0,
    parentId: string = "",
    mainClassificationId?: "",
  ) {
    this.subSystemId = subSystemId;
    this.color = color;
    this.description = description;
    this.icon = icon;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.isSubSystem = isSubSystem;
    this.mainNameAr = mainNameAr;
    this.mainNameEn = mainNameEn;
    this.havePermession = havePermession;
    this.isExternal = isExternal;
    this.isExternalComponent = isExternalComponent;
    this.isSinglSignOn = isSinglSignOn;
    this.identityProvider = identityProvider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.url = url;
    this.squence = squence;
    this.subsytemMainLookupId = subsytemMainLookupId;
    this.subsytemMainLookupNameAr = subsytemMainLookupNameAr;
    this.subsytemMainLookupNameEn = subsytemMainLookupNameEn;
    this.isComponent = isComponent;
    this.workspaceKey = workspaceKey;
    this.parentId = parentId;
    this.mainClassificationId = mainClassificationId;
  }
}

export default SystemClassification;
