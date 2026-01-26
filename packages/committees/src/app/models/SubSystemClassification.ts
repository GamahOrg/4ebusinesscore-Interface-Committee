class SubSystemClassification {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  subsytemMainLookupId: string;
  color: string | number;
  squence: number;
  isHide: boolean;
  constructor(
    id: string = "",
    nameAr: string = "",
    nameEn: string = "",
    description: string = "",
    descriptionEn: string = "",
    icon: string = "",
    subsytemMainLookupId: string = "",
    color: string | number = "",
    squence: number = 0,
    isHide: boolean = false
  ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.description = description;
    this.descriptionEn = descriptionEn;
    this.icon = icon;
    this.subsytemMainLookupId = subsytemMainLookupId;
    this.color = color;
    this.squence = squence;
    this.isHide = isHide;
  }
}

export default SubSystemClassification;
