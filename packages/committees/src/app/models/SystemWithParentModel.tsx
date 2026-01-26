import { SubsystemModel } from "./subsystemsModel"; 
export class SystemWithParentModelArray {
    data: SystemWithParentModel[];
    totalPages: number=1;
    totalItems: number=10;
  
    constructor(data: SystemWithParentModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class SystemWithParentModel {

    id: string;
    nameAr: string;
    nameEn: string;
    workspaces:SubsystemModel[]
  
    constructor(
      id: string = '',
      nameAr: string = '', 
      nameEn: string = '', 
      workspaces:SubsystemModel[]=[]
    ) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
     this.workspaces =workspaces 
    }
  }
  
  