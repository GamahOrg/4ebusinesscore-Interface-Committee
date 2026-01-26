export class parentRequestTemplateResponse{

    data: parentRequestTemplateModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: parentRequestTemplateModel[]=[], totalPages: number=1, totalItems: number=1) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
}
export class parentRequestTemplateModel{
  id?: string;
  name: string;
  requestCategoryName: string;
  parentRequestTemplateId: string;
  pathCount: number;
  constructor() {
    this.id = '';
    this.name = '';
    this.requestCategoryName = '';
    this.parentRequestTemplateId = '';
    this.pathCount = 0;
  }
}