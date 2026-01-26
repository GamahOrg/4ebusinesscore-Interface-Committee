export class requestTypesByCategoryIdResponse {
  data: requestTypesByCategoryIdModel[];
  totalPages: number;
  totalItems: number;

  constructor(
    data: requestTypesByCategoryIdModel[] = [],
    totalPages: number = 1,
    totalItems: number = 1
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}
export class requestTypesByCategoryIdModel {
  id: string;
  name: string;   
  constructor() {
    this.id = "";
    this.name = "";
  }
}
