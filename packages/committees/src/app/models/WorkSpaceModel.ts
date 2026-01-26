export class LkNoteType {
  id: string;
  nameAr: string;
  nameEn: string;

  constructor(id: string = "", nameAr: string = "", nameEn: string = "") {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
  }
}
enum State {
  NotDeleted,
  Deleted,
}
export class WorkspaceCardModel {
  id: string;
  parentNoteNameAr: string;
  parentNoteNameEn: string;
  noteNameAr: string;
  noteNameEn: string;
  description: string;
  icon: string;
  url: string;
  color: number;
  state: State;
  isActive: boolean;
  visitDate: string;
  lastUpdate: string;
  noteTypeId: string;
  organizationHierarchyId: string;
  orgNameAr: string;
  orgNameEn: string;
  lkNoteTypes: LkNoteType;
  workspaceKey: number;
  isExternal: boolean;
  isExternalComponent: boolean;
  isSinglSignOn: boolean;

  constructor(
    id: string = "",
    parentNoteNameAr: string = "",
    parentNoteNameEn: string = "",
    noteNameAr: string = "",
    noteNameEn: string = "",
    description: string = "",
    icon: string = "",
    url: string = "",
    color: number = 0,
    state: State = State.NotDeleted,
    isActive: boolean = true,
    visitDate: string = "",
    lastUpdate: string = "",
    noteTypeId: string = "",
    organizationHierarchyId: string = "",
    orgNameAr: string = "",
    orgNameEn: string = "",
    lkNoteTypes: LkNoteType = new LkNoteType(),
    workspaceKey: number = 0,
    isExternal: boolean = false,
    isExternalComponent: boolean = false,
    isSinglSignOn: boolean = false
  ) {
    this.id = id;
    this.parentNoteNameAr = parentNoteNameAr;
    this.parentNoteNameEn = parentNoteNameEn;
    this.noteNameAr = noteNameAr;
    this.noteNameEn = noteNameEn;
    this.description = description;
    this.icon = icon;
    this.url = url;
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
    this.workspaceKey = workspaceKey;
    this.isExternal = isExternal;
    this.isExternalComponent = isExternalComponent;
    this.isSinglSignOn = isSinglSignOn;
  }
}
