export class CommitteeMembersModelArray {
  data: CommitteeMembersModel[];
  totalPages: number;
  totalItems: number;

  constructor(
    data: CommitteeMembersModel[],
    totalPages: number,
    totalItems: number
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class CommitteeMembersModel {
  id: string;
  name: string;
  imgUrl: string;
  email: string;
  permissionNameAr: string;
  permissionNameEn: string;
  jobNameAr: string;
  jobNameEn: string;
  destinationName: string;
  constructor(
    id: string = "",
    name: string = "",
    imgUrl: string = "",
    email: string = "",
    permissionNameAr: string = "",
    permissionNameEn: string = "",
    jobNameAr: string = "",
    jobNameEn: string = "",
    destinationName: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
    this.email = email;
    this.permissionNameAr = permissionNameAr;
    this.permissionNameEn = permissionNameEn;
    this.jobNameAr = jobNameAr;
    this.jobNameEn = jobNameEn;
    this.destinationName = destinationName;
  }
}
