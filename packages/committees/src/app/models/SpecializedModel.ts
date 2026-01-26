export class SpecializedModelArray {
    data: SpecializedModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: SpecializedModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class SpecializedModel {
    id: string;
    nameAr: string;
    nameEn: string;
    cssClasses: string;
    constructor(
      id: string,
      nameAr: string,
      nameEn: string,
      cssClasses: string,
    ) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.cssClasses = cssClasses;
    }
  }
  