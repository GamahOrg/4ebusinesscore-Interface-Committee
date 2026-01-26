export class RoleModel {
  nameAr: string;
  nameEn: string;

  constructor(nameAr: string, nameEn: string) {
    this.nameAr = nameAr;
    this.nameEn = nameEn;
  }
}
export class UserLoginModel {
  id: string;
  userName: string;
  imageUrl: string;
  userGender: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  forthName: string;
  roles: RoleModel[]; // Use RoleModel as the type
  jobNameAr: string;
  jobNameEn: string;
  commonNameAD?:string;
  constructor(
    id: string,
    userName: string,
    imageUrl: string,
    userGender: number,
    firstName: string,
    secondName: string,
    thirdName: string,
    forthName: string,
    roles: RoleModel[], // Use RoleModel as the type
    jobNameAr: string,
    jobNameEn: string,
    commonNameAD?:string,
  ) {
    this.id = id;
    this.userName = userName;
    this.imageUrl = imageUrl;
    this.userGender = userGender;
    this.firstName = firstName;
    this.forthName = forthName;
    this.secondName = secondName;
    this.thirdName = thirdName;
    this.roles = roles;
    this.jobNameAr = jobNameAr;
    this.jobNameEn = jobNameEn;
    this.commonNameAD = commonNameAD;
  }
}
