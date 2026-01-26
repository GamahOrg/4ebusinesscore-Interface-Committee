export class ItemResponse {
  result: Item;
  pageIndex: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  message: string;
  statusEnum: number;

  constructor(
    result: Item = new Item(),
    pageIndex: number = 0,
    totalPages: number = 0,
    totalItems: number = 0,
    pageSize: number = 0,
    message: string = "",
    statusEnum: number = 1
  ) {
    this.result = result;
    this.pageIndex = pageIndex;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.pageSize = pageSize;
    this.message = message;
    this.statusEnum = statusEnum;
  }
}
export class Item {
  name: string;
  duration: string;
  effect: number;
  priorityLevel: number;
  serviceType: number;
  technicianSelection: number;
  requestTempleteName: string;
  slaId: string;
  description: string;
  categoryId: string;
  requestTemplateId: string;
  dynamicForm?: string;
  canBeRequestedByAllUsers?: boolean;
  workspaceServiceID?:string;
  isIintegrated?:boolean
  requestFor: number | undefined;
  constructor() {
    this.name = "";
    this.duration = "";
    this.effect = 1;
    this.priorityLevel = 1;
    this.serviceType = 1;
    this.technicianSelection = 0;
    this.requestTempleteName = "";
    this.slaId = "";
    this.description = "";
    this.categoryId = "";
    this.requestTemplateId = "";
    this.dynamicForm = "";
    this.canBeRequestedByAllUsers = true;
    this.workspaceServiceID="";
    this.isIintegrated=true
    this.requestFor=0
  }
}
