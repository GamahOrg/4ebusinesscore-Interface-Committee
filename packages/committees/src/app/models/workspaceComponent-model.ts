import { Lookup } from "./Lookup";
import { State } from "./response-status";

export class WorkspaceComponentModelArray {
  data: WorkspaceComponentModel[];
  totalPages: number;
  totalItems: number;

  constructor(
    data: WorkspaceComponentModel[],
    totalPages: number,
    totalItems: number
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class WorkspaceComponentModel {
  id: string;
  noteNameAr: string;
  noteNameEn: string;
  description: string;
  icon: string;
  color: number;
  state: number;
  isActive: boolean;
  visitDate: string;
  lastUpdate: string;
  noteTypeId: string;
  organizationHierarchyId: string;
  orgNameAr: string;
  orgNameEn: string;
  lkNoteTypes: Lookup;
  isSinglSignOn: boolean;

  constructor(
    id:string,
    noteNameAr: string,
    noteNameEn: string,
    description: string,
    icon: string,
    color: number,
    state: State,
    isActive: boolean,
    visitDate: string,
    lastUpdate: string,
    noteTypeId: string,
    organizationHierarchyId: string,
    orgNameAr: string,
    orgNameEn: string,
    lkNoteTypes:Lookup,
    isSinglSignOn: boolean,
  ) {
    this.id = id;
    this.noteNameAr = noteNameAr;
    this.noteNameEn = noteNameEn;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.state = state;
    this.isActive = isActive;
    this.visitDate = visitDate;
    this.lastUpdate = lastUpdate;
    this.noteTypeId = noteTypeId;
    this.organizationHierarchyId = organizationHierarchyId;
    this.orgNameAr = orgNameAr;
    this.orgNameEn = orgNameEn;
    this.lkNoteTypes = lkNoteTypes;
    this.isSinglSignOn = isSinglSignOn;
  }
}

