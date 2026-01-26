import { CommitteeTime, CommitteesStatus } from "../enums/enums-committees";
import { CommitteeMemberModel } from "./committee-member-model";
export class CommitteeModel {
  id: string;
  name: string;
  committeeDate: Date;
  endDateCommittee:Date;
  committeeTime: CommitteeTime;
  projectName: string;
  description: string;
  hasLegalDocument: boolean;
  workRule: string;
  legalDocument: string;
  missions: string;
  committeesStatus: CommitteesStatus;
  location: string;
  position: string;
  createdOn: Date;
  attachments: string[];
  workRules: string[];
  targets: string[];
  members?: any;
  endDate: Date;
  allExternalMembersDtos?: CommitteeMemberModel[];
  allInternalMembersDtos?: CommitteeMemberModel[];
  approvalExternalMembersDtos?:CommitteeMemberModel[];
  approvalInternalMembersDtos?:CommitteeMemberModel[];
  templateId?:string;
  requestInstanceId?:string;
  requestStatus?:number;
  isDelegated?:boolean;
  delegators?:[];
  constructor(
    id: string = "",
    name: string = "",
    committeeDate = new Date(),
    endDateCommittee=new Date(),
    endDate = new Date(),
    committeeTime: CommitteeTime = CommitteeTime.Always,
    projectName: string = "",
    description: string = "",
    hasLegalDocument: boolean = false,
    workRule: string = "",
    legalDocument: string = "",
    missions: string = "",
    committeesStatus: CommitteesStatus = 1,
    location: string = "",
    position: string = "",
    createdOn: Date = new Date(),
    attachments: string[] = [],
    workRules: string[] = [],
    targets: string[] = [],
    members: any = [],
    allExternalMembersDtos: CommitteeMemberModel[] = [],
    allInternalMembersDtos: CommitteeMemberModel[] = [],
    approvalExternalMembersDtos: CommitteeMemberModel[] = [],
    approvalInternalMembersDtos: CommitteeMemberModel[] = [],
    templateId:string="",
    requestInstanceId:string="",
    requestStatus:number=0,
    isDelegated:boolean = false,
    delegators: any =[]
  ) {
    this.id = id;
    this.name = name;
    this.committeeTime = committeeTime;
    this.projectName = projectName;
    this.description = description;
    this.hasLegalDocument = hasLegalDocument;
    this.workRule = workRule;
    this.legalDocument = legalDocument;
    this.missions = missions;
    this.committeesStatus = committeesStatus;
    this.location = location;
    this.position = position;
    this.createdOn = createdOn;
    this.attachments = attachments;
    this.workRules = workRules;
    this.targets = targets;
    this.committeeDate = committeeDate;
    this.members = members;
    this.committeeDate = committeeDate;
    this.members = members;
    this.endDate = endDate;
    this.allExternalMembersDtos = allExternalMembersDtos;
    this.allInternalMembersDtos = allInternalMembersDtos;
    this.approvalExternalMembersDtos=approvalExternalMembersDtos;
    this.approvalInternalMembersDtos=approvalInternalMembersDtos;
    this.templateId=templateId;
    this.requestInstanceId=requestInstanceId;
    this.requestStatus=requestStatus;
    this.endDateCommittee=endDateCommittee;
    this.isDelegated = isDelegated;
    this.delegators = delegators;
  }
}
