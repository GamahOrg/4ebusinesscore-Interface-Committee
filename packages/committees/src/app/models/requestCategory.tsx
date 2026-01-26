export class requestCategoryResponse{

    data: requestCategoryModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: requestCategoryModel[]=[], totalPages: number=1, totalItems: number=1) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
}
export class requestCategoryModel{
  id?: string;
  name: string;

  constructor() {
    this.id = '';
    this.name = '';
  }
}