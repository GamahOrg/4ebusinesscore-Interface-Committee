export class ProceedingModel {
  id: string;
  committeeId: string;
  name: string;
  notes: string;
  attachments: string[];
  members: any;
  date: Date;
  createdOn:Date;
  meetings: MeetingModel[];
  externalMembers?:any;
  internalMembers?:any

  constructor(
    id: string = "",
    committeeId: string = "",
    name: string = "",
    notes: string = "",
    attachments: string[] = [""],
    members: [] = [],
    date: Date = new Date(),
    createdOn: Date = new Date(),
    meetings: MeetingModel[] = [],
    externalMembers:any=[],
    internalMembers:any=[]
  ) {
    this.id = id;
    this.committeeId = committeeId;
    this.name = name;
    this.notes = notes;
    this.attachments = attachments;
    this.members = members;
    this.date = date;
    this.createdOn=createdOn;
    this.meetings = meetings;
    this.externalMembers=externalMembers;
    this.internalMembers=internalMembers
  }
}
export class MeetingModel {
  id: string;
  name: string;
  rules: string;
  location: string;
  meetingStatus: any;
  meetingDate: Date;
  hasExpertAssist: boolean;
  committeeId: string;

  constructor(
    id: string = "",
    name: string = "",
    rules: string = "",
    hasExpertAssist: boolean = true,
    meetingStatus: any = "",
    meetingDate: Date = new Date(),
    location: string = "",
    committeeId: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.committeeId = committeeId;
    this.hasExpertAssist = hasExpertAssist;
    this.location = location;
    this.meetingDate = meetingDate;
    this.meetingStatus = meetingStatus;
    this.rules = rules;
  }
}
