export class OrgModelArray {
    data: OrgHierarchyModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: OrgHierarchyModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class OrgHierarchyModel {
    id: string;
    nameAr:string;
    nameEn: string;
    description:string;
    parentId:string;
    managerId:string;
    organizationMembers:string[];
    categoryId:string;
    categoryNameAr:string;
    categoryNameEn:string;
    collapsed:boolean;
    checked:boolean;
    children:OrgHierarchyModel[];
  
    constructor(
    id: string,
    nameAr:string,
    nameEn: string,
    description:string,
    parentId:string,
    managerId:string,
    organizationMembers:string[],
    categoryId:string,
    categoryNameAr:string,
    categoryNameEn:string,
    collapsed:boolean,
    checked:boolean,
    children:OrgHierarchyModel[],
   
    ) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.description = description;
      this.parentId = parentId;
      this.managerId = managerId;
      this.organizationMembers = organizationMembers;
      this.categoryId = categoryId;
      this.categoryNameAr=categoryNameAr;
      this.categoryNameEn=categoryNameEn;
      this.children=children
      this.collapsed=collapsed
      this.checked=checked
    }
  }
  