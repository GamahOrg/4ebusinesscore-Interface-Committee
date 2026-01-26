import { State } from "./response-status";

export interface WorkSpace {
  noteNameAr: string;
  noteNameEn: string;
  url: string;
  description: string;
  icon: string;
  color: number;
  state: State;
  isActive: boolean;
  visitDate: string;
  organizationHierarchyId: string | null;
  noteTypeId: string | null;
  parentId: string | null;
}

export default class WorkSpaceSystem {
  noteNameAr: string;
  noteNameEn: string;
  url: string;
  description: string;
  icon: string;
  color: number;
  state: State;
  isActive: boolean;
  visitDate: string;
  organizationHierarchyId: string | null;
  subsytemMainId: any;
  isVisiable?: boolean;
  isExternal?: boolean;
  isSinglSignOn?: boolean;
  identityProvider?: string | null;
  clientId?: string | null;
  clientSecret?: string | null;
  constructor(
    noteNameAr: string = "",
    noteNameEn: string = "",
    url: string = "",
    description: string = "",
    icon: string = "",
    state: State = 0,
    visitDate: string = "",
    organizationHierarchyId: string = "",
    color: number = 0,
    isActive: boolean = false,
    subsytemMainId: any = "",
    isVisiable: boolean = false,
    isExternal: boolean = false,
    isSinglSignOn: boolean = false,
    identityProvider: string = "",
    clientId: string = "",
    clientSecret: string = ""
  ) {
    this.noteNameAr = noteNameAr;
    this.noteNameEn = noteNameEn;
    this.url = url;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.state = state;
    this.isActive = isActive;
    this.visitDate = visitDate;
    this.organizationHierarchyId = organizationHierarchyId;
    this.subsytemMainId = subsytemMainId;
    this.isVisiable = isVisiable;
    this.isExternal = isExternal;
    this.isSinglSignOn = isSinglSignOn;
    this.identityProvider = identityProvider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
}
