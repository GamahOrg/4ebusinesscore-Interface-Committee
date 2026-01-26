export class exceptionUsersModel{
    userId: string;
    userName: string;
    userFullName: string;
    imageUrl: string;
    email:string;
    isChecked?:boolean
  
    constructor() {
      this.userId = '';
      this.userName = '';
      this.userFullName = '';
      this.imageUrl = "";
      this.email = "";
      this.isChecked=true
    }
  }