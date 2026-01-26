export class CommitteeMemberModel {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  job: string;
  destinationName: string;
  email: string;
  permissionNameAr: string;
  permissionNameEn: string;
  permissionId: string;
  imagUrl: string;
  isAttend:boolean
  constructor(
    id: string = "",
    userId: string = "",
    name: string = "",
    phoneNumber: string = "",
    job: string = "",
    destinationName: string = "",
    email: string = "",
    permissionNameAr: string = "",
    permissionNameEn: string = "",
    permissionId: string = "",
    imagUrl: string = "",
    isAttend:boolean=false
  ) {
    this.userId = userId;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.permissionId = permissionId;
    this.email = email;
    this.permissionNameAr = permissionNameAr;
    this.permissionNameEn = permissionNameEn;
    this.job = job;
    this.destinationName = destinationName;
    this.imagUrl = imagUrl;
    this.id = id;
    this.isAttend=isAttend
  }
}
