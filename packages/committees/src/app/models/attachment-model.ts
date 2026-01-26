export class AttachmentModel {
    id:string;
    fullName:string;
    createdOn:Date;
    path:string;
    constructor(
      id:string="",
      fullName:string= "",
      createdOn:Date = new Date(),
      path:string="",
    
    ) {
      this.id=id;
      this.fullName=fullName;
      this.path=path;
      this.createdOn=createdOn
    }
  }
  