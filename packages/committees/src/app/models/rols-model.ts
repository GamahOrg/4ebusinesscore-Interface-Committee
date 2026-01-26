export class RolsModelArray {
    data: RolsModel[];
    totalPages: number = 1;
    totalItems: number = 10;
  
    constructor(data: RolsModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class RolsModel {
    id: string;
    nameAr: string | null;
    nameEn: string;
    details: string;
    roleCategoryId: string;
    constructor(
      id: string,
      nameAr: string | null,
      nameEn: string,
      details: string,
      roleCategoryId: string,
    ) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.details = details;
      this.roleCategoryId = roleCategoryId;
    }
  }
  