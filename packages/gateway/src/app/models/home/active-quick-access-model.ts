export class ActiveQuickAccessModel {
  id: string;
  createdBy: string;
  userName: string;
  noteNameAr: string;
  description: string;
  noteNameEn: string;
  icon: string;
  color: number;
  updatedOn: Date;
  createdOn: Date;
  isChecked: boolean;
  workspaceId: string;
  url:string;
  subsystemid:string;
  constructor(
    id: string,
    createdBy: string,
    userName: string,
    noteNameAr: string,
    description: string,
    noteNameEn: string,
    icon: string,
    color: number,
    updatedOn: Date,
    createdOn: Date,
    isChecked: boolean,
    workspaceId: string,
    url:string,
    subsystemid:string
  ) {
    this.id = id;
    this.createdBy = createdBy;
    this.userName = userName;
    this.noteNameAr = noteNameAr;
    this.description = description;
    this.noteNameEn = noteNameEn;
    this.icon = icon;
    this.color = color;
    this.updatedOn = updatedOn;
    this.createdOn = createdOn;
    this.isChecked = isChecked;
    this.workspaceId = workspaceId;
    this.url = url;
    this.subsystemid=subsystemid
  }
}
