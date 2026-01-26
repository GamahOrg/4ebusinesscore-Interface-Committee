export class OutputTypesModelArray {
  data: OutputTypesModel[];
  totalPages: number;
  totalItems: number;

  constructor(data: OutputTypesModel[], totalPages: number, totalItems: number) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class OutputTypesModel {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  cssClasses: string;
  constructor(
    id: string = "",
    nameAr: string = "",
    nameEn: string = "",
    description: string = "",
    cssClasses: string = "",
  ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.description = description;
    this.cssClasses = cssClasses;
  }
}
