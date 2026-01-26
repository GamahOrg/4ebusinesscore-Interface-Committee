export class requestTemplatesByRequestTypeIdResponse {
    data: requestTemplatesByRequestTypeIdModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(
      data: requestTemplatesByRequestTypeIdModel[] = [],
      totalPages: number = 1,
      totalItems: number = 1
    ) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  export class requestTemplatesByRequestTypeIdModel {
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
  
  
  // GetRequestTemplatesByRequestTypeId
  