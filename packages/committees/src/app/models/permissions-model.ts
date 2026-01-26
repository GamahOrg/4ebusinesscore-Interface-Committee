
export class PermissionsModel {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  cssClasses: string;

  constructor(
    id: string = "",
    nameAr: string = "",
    nameEn: string = "",
    description: string = "",
    cssClasses: string = ""
  ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.description = description;
    this.cssClasses = cssClasses;
  }
}
