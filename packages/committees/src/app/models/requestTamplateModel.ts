export class requestTamplateResponse{

    data: requestTamplateModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: requestTamplateModel[]=[], totalPages: number=1, totalItems: number=1) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
}
export class requestTamplateModel{
  id?: string;
  name: string;
  requestCategoryName: string;
  parentRequestTemplateId: number;
  pathCount: number;

  constructor() {
    this.id = '';
    this.name = '';
    this.requestCategoryName = '';
    this.parentRequestTemplateId = 0;
    this.pathCount = 0;
  }
}