export class requestTamplateByIdModel {
  name: string;
  categoryName: string;
  parentName: string;
  categoryId: string;
  parentId: string;
  requestCategoryTypeName: string;
  requestCategoryTypeId: string;
  pathCount: number;
  requestTemplateStepDtos: requestTemplateStepDtosModel[];

  constructor() {
    this.name = '';
    this.categoryName = '';
    this.parentName = '';
    this.categoryId = '';
    this.parentId = '';
    this.requestCategoryTypeName = '';
    this.requestCategoryTypeId = '';
    this.pathCount = 0;
    this.requestTemplateStepDtos = [];
  }
}

export class requestTemplateStepDtosModel {
  stepNumber: number;
  slaId: string;
  slaName: string;
  implementationDays: number;
  implementationHours: number;
  implementationMinutes: number;
  actionTakerId: string;
  actionTackerType: number;
  roleId: string;
  actionTackerName: string;
  roleName: string;
  type: number;
  constructor(
    stepNumber: number,
    slaId: string,
    slaName: string,
    implementationDays: number,
    implementationHours: number,
    implementationMinutes: number,
    actionTakerId: string,
    actionTackerType: number,
    roleId: string,
    actionTackerName: string,
    roleName: string,
    type: number,

  ) {
    this.stepNumber = stepNumber;
    this.slaId = slaId;
    this.slaName = slaName;
    this.implementationDays = implementationDays;
    this.implementationHours = implementationHours;
    this.implementationMinutes = implementationMinutes;
    this.actionTakerId = actionTakerId;
    this.actionTackerType = actionTackerType;
    this.roleId = roleId;
    this.actionTackerName = actionTackerName;
    this.roleName = roleName;
    this.type = type;
  }
}


