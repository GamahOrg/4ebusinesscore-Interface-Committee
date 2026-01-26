export class EmployeeModelArray {
  data: EmployeeModel[];
  totalPages: number;
  totalItems: number;

  constructor(data: EmployeeModel[], totalPages: number, totalItems: number) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class EmployeeModel {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  parentId: string;
  mebmers: MebmersModel[];
  categoryId: string;

  constructor(
    id: string,
    nameAr: string,
    nameEn: string,
    description: string,
    parentId: string,
    mebmers: MebmersModel[],
    categoryId: string
  ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.description = description;
    this.parentId = parentId;
    this.mebmers = mebmers;
    this.categoryId = categoryId;
  }
}

export class MebmersModel {
  imageUrl: string;
  userNmae: string;
  userId: string;
  userGender: number;
  constructor(
    imageUrl: string,
    userNmae: string,
    userId: string,
    userGender: number
  ) {
    this.imageUrl = imageUrl;
    this.userNmae = userNmae;
    this.userId = userId;
    this.userGender = userGender;
  }
}
