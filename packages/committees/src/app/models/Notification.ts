export class NotificationModel {
  id: string;
  noteNameAR: string;
  noteNameEn: string;
  messageAr: string;
  messageEn: string;
  actionUrl: string;
  createdOn: string;
  title: string;
  titleEn: string;
  readed: boolean;
  countNotReaded: number;
  workspaceKey: number;
  workspaceKeyTo: number;
  subsystemid?:string;
  cardname?:string

  constructor(
    id: string = "",
    noteNameAR: string = "",
    noteNameEn: string = "",
    messageAr: string = "",
    messageEn: string = "",
    actionUrl: string = "",
    createdOn: string = "",
    title: string = "",
    titleEn: string = "",
    readed: boolean = false,
    countNotReaded: number = 0,
    workspaceKey: number = 0,
    workspaceKeyTo:number = 0,
    subsystemid:string="",
    cardname:string=""
  ) {
    this.id = id;
    this.noteNameAR = noteNameAR;
    this.noteNameEn = noteNameEn;
    this.messageAr = messageAr;
    this.messageEn = messageEn;
    this.actionUrl = actionUrl;
    this.createdOn = createdOn;
    this.title = title;
    this.titleEn = titleEn;
    this.readed = readed;
    this.countNotReaded = countNotReaded;
    this.workspaceKey = workspaceKey;
    this.workspaceKeyTo = workspaceKeyTo;
    this.subsystemid=subsystemid;
    this.cardname=cardname
  }
}
