import { MeetingsStatus } from "../enums/enums-committees";

export class MeetingModel {
    id:string;
    name:string;
    rules:string;
    location:string;
    meetingStatus:MeetingsStatus;
    hasExpertAssist:boolean;
    meetingDate:Date;
    committeeId:string;
    attachments:string[];
    createdBy:string;
    fullName: string;
    externalMeetingMembers:ExternalMemberModel[];
    internalMeetingMembers:InternalMemberModel[]
    constructor(
      id:string="",
      name:string="",
       rules:string="",
      location:string="",
      meetingStatus:MeetingsStatus=MeetingsStatus.Remotely,
      hasExpertAssist:boolean=true,
      meetingDate:Date = new Date(),
      committeeId:string="",
      attachments:string[]=[],
      createdBy:string="",
      fullName: string = "",
      externalMeetingMembers:ExternalMemberModel[]=[],
      internalMeetingMembers: InternalMemberModel[]=[]
    ) {
      this.id=id;
      this.name=name;
      this.rules = rules;
      this.location=location;
      this.meetingStatus=meetingStatus;
      this.hasExpertAssist=hasExpertAssist;
      this.meetingDate=meetingDate;
      this.committeeId=committeeId;
      this.attachments=attachments;
      this.createdBy=createdBy
      this.fullName=fullName;
      this.externalMeetingMembers=externalMeetingMembers;
      this.internalMeetingMembers=internalMeetingMembers
    }
  }
export class ExternalMemberModel {
    id:string;
    name:string;
    phoneNumber:string;
    job:string;
    destinationName:string;
    email:string;
    permissionNameAr:string;
    permissionNameEn:string
    constructor(
      id:string="",
      name:string="",
      phoneNumber:string="",
      job:string="",
      destinationName:string="",
      email:string="",
      permissionNameAr:string="",
      permissionNameEn: string = ""
    ) {
      this.id=id;
      this.name=name;
      this.destinationName=destinationName;
      this.email=email;
      this.job=job;
      this.permissionNameAr=permissionNameAr;
      this.permissionNameEn=permissionNameEn;
      this.phoneNumber=phoneNumber
    }
  }
  export class InternalMemberModel {
    fullName:string;
    jobNameAr: string;
    jobNameEn: string
    permissionId: string
    permissionNameAr:string
    permissionNameEn:string
    userId:string
    email:string
    constructor(
      fullName:string="",
    jobNameAr: string="",
    jobNameEn: string="",
    permissionId: string="",
    permissionNameAr:string="",
    permissionNameEn:string="",
    userId:string="",
    email:string=""
    ) {
      this.userId=userId;
      this.permissionId=permissionId;
      this.permissionNameAr=permissionNameAr;
      this.permissionNameEn=permissionNameEn;
      this.fullName=fullName;
      this.jobNameAr=jobNameAr;
      this.jobNameEn=jobNameEn;
      this.email=email
    }
  }
  