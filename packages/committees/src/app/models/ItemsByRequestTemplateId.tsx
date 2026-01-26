export class ItemsByRequestTemplateIdResponse {
  result: ItemsByRequestTemplateId[];
  pageIndex: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;

  constructor(
    result: ItemsByRequestTemplateId[] = [],
    pageIndex: number = 0,
    totalPages: number = 0,
    totalItems: number = 0,
    pageSize: number = 0
  ) {
    this.result = result;
    this.pageIndex = pageIndex;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.pageSize = pageSize;
  }
}
export class ItemsByRequestTemplateId {
  itemId: string;
  itemName: string;
  canBeRequestedByAllUsers: boolean;
  categoryName: string;
  duration: string;
  effect: number;
  mainclassificationName: string;
  priorityLevel: number;
  serviceCatlogName: string;
  technicianSelection: number;
  constructor() {
    this.itemId = "";
    this.itemName = "";
    this.canBeRequestedByAllUsers = false;
    this.categoryName = "";
    this.duration = "";
    this.effect = 0;
    this.mainclassificationName = "";
    this.priorityLevel = 0;
    this.serviceCatlogName = "";
    this.technicianSelection = 0;
  }
}
