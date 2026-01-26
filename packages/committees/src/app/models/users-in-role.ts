export class UserRole {
  roleId: string;
  userId: string;
  createdOn: Date;
  firstName: string | null;
  secondName: string | null;
  userName: string;
  imageUrl: string;
  email: string;
  forthName: string | null = null;
  thirdName: string | null = null;
  userGender: number | null;

  constructor(
    roleId: string,
    userId: string,
    createdOn: Date,
    userName: string,
    imageUrl: string,
    email: string,
    firstName: string | null = null,
    secondName: string | null = null,
    forthName: string | null = null,
    thirdName: string | null = null,
    userGender: number | null
  ) {
    this.roleId = roleId;
    this.userId = userId;
    this.createdOn = createdOn;
    this.userName = userName;
    this.imageUrl = imageUrl;
    this.email = email;
    this.firstName = firstName;
    this.secondName = secondName;
    this.forthName = forthName;
    this.thirdName = thirdName;
    this.userGender = userGender;
  }
}
