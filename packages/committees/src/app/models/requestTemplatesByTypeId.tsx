export class requestTemplatesByTypeIdResponse {
  data: requestTemplatesByTypeIdModel[];
  totalPages: number;
  totalItems: number;

  constructor(
    data: requestTemplatesByTypeIdModel[] = [],
    totalPages: number = 1,
    totalItems: number = 1
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}
export class requestTemplatesByTypeIdModel {
  id: string;
  name: string;   
  requestCategoryName: string;   
  requestCategoryTypeName: string;   
  parentRequestTemplateId: string;   
  pathCount: number;     
  constructor() {
    this.id = "";
    this.name = "";
    this.requestCategoryName = "";
    this.requestCategoryTypeName = "";
    this.parentRequestTemplateId = "";
    this.pathCount = 0;
  }
}
