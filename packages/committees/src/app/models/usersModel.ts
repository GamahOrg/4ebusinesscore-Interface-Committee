export class UsersModelArray {
    data: UsersModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: UsersModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
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
      id: string | number | Number,
      userName: string,
      email: string,
      firstName: string,
      secondName: string,
      thirdName: string,
      forthName: string,
      userGender: number,
      userType: number,
      domainId: string,
      domain: string,
      isNafaz: boolean,
      isExpired: boolean,
      lastLoginTime: Date,
      imageUrl: string
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
  