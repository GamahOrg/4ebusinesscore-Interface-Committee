export class HomeSettingsLanguageFormModel {
    id: string;
    nameAr: string;
    nameEn: string;
    nightMode: boolean;
    lookupId: string;
    languageImage: string;
  
    constructor(
      id: string,
      nameAr: string,
      nameEn: string,
      nightMode: boolean,
      lookupId: string,
      languageImage: string
    ) {
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.id = id;
      this.languageImage = languageImage;
      this.nightMode = nightMode;
      this.lookupId = lookupId;
    }
  }
  