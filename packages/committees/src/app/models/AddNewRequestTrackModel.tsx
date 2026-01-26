import { DestinationTypeEnums } from "../enums/enums-track-requests";

export class AddNewRequestTrackModel {
  name: string;
  actionOptions: number;
  requestCategoryId: string;
  parentRequestTemplateId: string;
  requestTemplateStepDtos: PostRequestPathStep[];

  constructor() {
    this.name = "";
    this.actionOptions = 0;
    this.requestCategoryId = "";
    this.parentRequestTemplateId = "";
    this.requestTemplateStepDtos = [];
  }
}

export class PostRequestPathStep {
  stepOrder: number;
  status: boolean;
  destinationType: DestinationTypeEnums;
  destinationId: string;
  slaId: string;
  roleId: string;

  constructor(stepOrder: number, status: boolean, destinationType: DestinationTypeEnums, destinationId: string, slaId: string, roleId: string) {
    this.stepOrder = stepOrder;
    this.status = status;
    this.destinationType = destinationType;
    this.destinationId = destinationId;
    this.slaId = slaId;
    this.roleId = roleId;
  }
}