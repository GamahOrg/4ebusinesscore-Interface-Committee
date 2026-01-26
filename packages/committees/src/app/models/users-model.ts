export class UsersModel {
  id: string | number | Number;
  userName: string;
  email: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  forthName: string;
  userGender: number;
  userType: number;
  domainId: string;
  domain: string;
  isNafaz: boolean;
  isExpired: boolean;
  lastLoginTime: Date;
  imageUrl: string;
  constructor(
    id: string | number | Number = "",
    userName: string = "",
    email: string = "",
    firstName: string = "",
    secondName: string = "",
    thirdName: string = "",
    forthName: string = "",
    userGender: number = 0,
    userType: number = 0,
    domainId: string = "",
    domain: string = "",
    isNafaz: boolean = false,
    isExpired: boolean = false,
    lastLoginTime: Date = new Date(),
    imageUrl: string = ""
  ) {
    this.domain = domain;
    this.domainId = domainId;
    this.id = id;
    this.userName = userName;
    this.secondName = secondName;
    this.thirdName = thirdName;
    this.userGender = userGender;
    this.userType = userType;
    this.email = email;
    this.firstName = firstName;
    this.forthName = forthName;
    this.imageUrl = imageUrl;
    this.isExpired = isExpired;
    this.isNafaz = isNafaz;
    this.lastLoginTime = lastLoginTime;
  }
}
