export class userRoleModel {
    constructor(
      public roleID: string,
      public roleNameAr: string,
      public roleNameEn: string,
      public date: Date,
      public creatorFirstName: string,
      public creatorSecondNam: string,
      public creatorThirdName: string,
      public creatorForthName: string,
      public creatorUserName: string,
    ) { }
  }